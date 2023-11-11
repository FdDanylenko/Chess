import { Colors } from "./Colors";
import { Piece } from "./pieces/Piece";
import { PiecesNames } from "./pieces/PiecesNames";
import { Board } from "./Board";
import { King } from "./pieces/King";
import { Bishop } from "./pieces/Bishop";
export class Cell{
  readonly x: number;
  readonly y: number;
  color: Colors;
  piece: Piece | null;
  board: Board;
  available: boolean;
  availableToPassant?: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, piece: Piece | null){
    this.x = x;
    this.y = y;
    this.color = color;
    this.piece = piece;
    this.board = board;
    this.available = false;
    this.availableToPassant = false;
    this.id = Math.random();
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
  isEmtyHorizontal(target: Cell): boolean{
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
  setPiece(piece: Piece){
    this.piece = piece;
    this.piece.cell = this;
  }
  addMove(cell: Cell, target: Cell){
    var letter = String.fromCharCode('A'.charCodeAt(0) + target.x);
    if(cell.piece?.color === Colors.BLACK){
      if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x == 2){
        this.board.blackMoves.push('0-0');
      }
      else if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x < 0){
        this.board.blackMoves.push('0-0-0');
      }
      else{
        if(target.piece){
          this.board.blackMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ? cell.piece.name.charAt(0).toLowerCase() : '')) + "x" + letter.toLowerCase() + (8-target.y));
        }
        else{
          this.board.blackMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ? cell.piece.name.charAt(0).toLowerCase() : '')) + letter.toLowerCase() + (8-target.y));
        }
      }
      console.log("move");
    }
    else if(cell.piece?.color === Colors.WHITE){
      if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x > 1){
        this.board.whiteMoves.push('0-0');
      }
      else if(cell.piece.name.charAt(2).toLowerCase() === 'n' && target.x - cell.x < 0){
        this.board.whiteMoves.push('0-0-0');
      }
      else{
        if(target.piece){
          this.board.whiteMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ? cell.piece.name.charAt(0).toLowerCase() : '')) + "x" + letter.toLowerCase() + (8-target.y));
        }
        else{
          this.board.whiteMoves.push((cell.piece.name.charAt(1) === 'n' ? 'n' : (cell.piece.name.charAt(0) !== 'P' ? cell.piece.name.charAt(0).toLowerCase() : '')) + letter.toLowerCase() + (8-target.y));
        }
      }
      console.log("move");
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
    if(this.piece && this.piece?.canMove(target)){
      this.piece?.movePiece(target);
      if(target.piece){
        this.addLostPiece(target.piece);
      }
      target.setPiece(this.piece);
      this.piece = null;
      return 1;
    }
    return 0;
  }
}