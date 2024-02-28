import { Colors } from "./Colors";
import { Piece } from "./pieces/Piece";
import { PiecesNames } from "./pieces/PiecesNames";
import { Board } from "./Board";
import { King } from "./pieces/King";
import { Pawn } from "./pieces/Pawn";
export class Cell{
  readonly x: number;
  readonly y: number;
  color: Colors;
  piece: Piece | null;
  board: Board;
  available: boolean;
  availableToPasant: boolean = false;
  id: number; 

  constructor(board: Board, x: number, y: number, color: Colors, piece: Piece | null){
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }
  public equals(otherX: number, otherY: number): boolean {
    return this.x === otherX && this.y === otherY;
  }
  isEmpty(){
    return this.piece === null;
  }
  isEnemy(target: Cell): boolean{
    if(target.piece){
      return this.piece?.color !== target.piece.color;
    }
    return false;
  }
  isEmptyVertical(target: Cell): boolean{
    if(this.x !== target.x){
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if(!this.board.getCell(this.x, y).isEmpty()){
        return false;
      }
    }
    return true;
  }
  isEmptyHorizontal(target: Cell): boolean{
    if(this.y !== target.y){
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if(!this.board.getCell(x, this.y).isEmpty()){
        return false;
      }
    }
    return true;
  } 
  isEmptyDiagonal(target: Cell): boolean{
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) {
      return false
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if(!this.board.getCell(this.x + dx*i, this.y + dy * i).isEmpty()){
        return false;
      }
    }
    return true;
  }
  setPiece(piece: Piece | null){
    if(piece !== null){
      this.piece = piece;
      this.piece.cell = this;
    }
  }
  addMove(cell: Cell, target: Cell, targetPiece: Piece | null, additionalInfo: string, addLostPiece: boolean){
    var letter = String.fromCharCode('A'.charCodeAt(0) + target.x);
    if(cell.piece){
      if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x === 2){
        cell.piece?.color === Colors.BLACK ? this.board.blackMoves.push('0-0' + additionalInfo) : this.board.whiteMoves.push('0-0' + additionalInfo)
      }
      else if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x === -2){
        cell.piece?.color === Colors.BLACK ? this.board.blackMoves.push('0-0-0' + additionalInfo) : this.board.whiteMoves.push('0-0-0' + additionalInfo);
      }
      else{
        if((targetPiece && targetPiece !== null || addLostPiece)){
          (cell.piece?.color === Colors.BLACK) 
          ?
          this.board.blackMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ?
            cell.piece.name.charAt(0).toLowerCase() : cell.x!==target.x ? String.fromCharCode('A'.charCodeAt(0) + cell.x).toLowerCase() : '')) + "x" + letter.toLowerCase() + (8-target.y) + additionalInfo)
          :
          this.board.whiteMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ?
            cell.piece.name.charAt(0).toLowerCase() : cell.x!==target.x ? String.fromCharCode('A'.charCodeAt(0) + cell.x).toLowerCase() : '')) + "x" + letter.toLowerCase() + (8-target.y) + additionalInfo);
        }
        else{
          (cell.piece?.color === Colors.BLACK) 
          ?
          this.board.blackMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ?
            cell.piece.name.charAt(0).toLowerCase() : cell.x!==target.x ? String.fromCharCode('A'.charCodeAt(0) + cell.x).toLowerCase() : '')) + letter.toLowerCase() + (8-target.y) + additionalInfo)
          :
          this.board.whiteMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ?
          cell.piece.name.charAt(0).toLowerCase() : cell.x!==target.x ? String.fromCharCode('A'.charCodeAt(0) + cell.x).toLowerCase() : '')) + letter.toLowerCase() + (8-target.y) + additionalInfo);
        }
      }
    }
  }
  removeLostPiece(piece: Piece){
    if(piece.color === Colors.BLACK){
      this.board.blackLostPieces.slice(0, -1);
    }
    else{
      this.board.whiteLostPieces.slice(0, -1);
    }
  }
  addLostPiece(piece: Piece){
    if(piece.color === Colors.BLACK){
      this.board.blackLostPieces.push(piece);
    }
    else{
      this.board.whiteLostPieces.push(piece);
    }
  }

  movePiece(target: Cell){
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const foundedCell = target.board.getCell(row, col);
        if(foundedCell.availableToPasant){
          this.board.previousPasant = foundedCell;
        }
      }
    }
    if(this.piece && this.piece?.canMove(target)){
      const thisPiece = this.piece;
      const thisCell = this;
      let oppositeDirection = 0;
      let pieceBehind = null;
      if(thisPiece instanceof Pawn){
        oppositeDirection = thisPiece.color === Colors.BLACK ? -1 : 1;
        pieceBehind = target.board.getCell(target.x, (target.y + oppositeDirection)).piece; 
      } 
      const targetPiece = target.piece;
      const targetCell = target;
      let addLostPiece: boolean = false;
      let additionalInfo: string = "";
      let wasPawnsFirstMove: boolean = false;
      this.piece.movePiece(target);
      if((this.piece as Pawn)){
        wasPawnsFirstMove = (this.piece as Pawn).isFirstStep;
      }
      target.setPiece(this.piece);
      this.piece = null;
      let myKing: Cell | void = thisPiece.findAllyKing(thisPiece.color);
      ((myKing as Cell).piece as King).checkFromWho?.piece?.recheckIfCheck((myKing as Cell));
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const targetCell = (myKing as Cell).board.getCell(row, col);
          if (targetCell.piece && targetCell.piece.canMove((myKing as Cell)) && (myKing as Cell).piece?.name === PiecesNames.KING && targetCell.piece.color !== (myKing as Cell).piece?.color) {
            ((myKing as Cell).piece as King).isCheck = true;
            ((myKing as Cell).piece as King).checkFromWho = targetCell;
          }
        }
      }
      if(((myKing as Cell).piece as King).isCheck === false || !((myKing as Cell).piece as King).checkFromWho?.piece){
        ((myKing as Cell).piece as King).isCheck = false;
        if(targetPiece){
          this.addLostPiece(targetPiece);
        }
        if(target.availableToPasant){
          this.addLostPiece(pieceBehind ? pieceBehind : thisPiece);
          addLostPiece = true;
        }
        if(this.piece && (this.piece as Pawn)){
          (this.piece as Pawn).isFirstStep = !wasPawnsFirstMove;
        }
        let foundedCell: Cell | null = this.board.getCell(this.board.previousPasant?.x ? this.board.previousPasant?.x : 0, this.board.previousPasant?.y ? this.board.previousPasant?.y : 0);
        this.board.previousPasant = null;
        (foundedCell as Cell).availableToPasant = false;
      }
      else{
        this.setPiece(thisPiece);
        target.piece = targetPiece;
        if(this.piece && (this.piece as Pawn)){
          (this.piece as Pawn).isFirstStep = wasPawnsFirstMove;
          this.board.getCell(this.x, (this.y+1)).availableToPasant = false;
          ((myKing as Cell).piece as King).isCheck = false;
        }
        return 4;
      }
      this.piece = thisPiece;
      let enemyKing: Cell | void = this.board.findKing(this.board, (thisPiece.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE));
      this.piece?.recheckIfCheck((enemyKing as Cell));
      if(thisPiece instanceof Pawn && target.y ===  (thisPiece.color === Colors.WHITE ? 0 : 7)){
        additionalInfo += "Q";
      }
      if(((enemyKing as Cell).piece as King).isCheck || ((enemyKing as Cell).piece as King).isCheckMate){
        if(((enemyKing as Cell).piece as King).isCheckMate){
          additionalInfo += "#";
        }
        else{
          additionalInfo += "+";
        }
      }
      (this.piece as Pawn).isFirstStep = false;
      this.addMove(this, target, targetPiece ? targetPiece : null, additionalInfo, addLostPiece);
      this.piece = null;
      return 1;
    }
    return 0;
  }
}