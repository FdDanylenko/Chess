import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from './PiecesNames';
import { Board } from "../Board";
import whiteLogo from '../../assets/pieces-png/king-w.png';
import blackLogo from '../../assets/pieces-png/king-b.png';
import { Rook } from "./Rook";

export class King extends Piece{
  isCheck: boolean = false;
  isCheckMate: boolean = false;
  isStaleMate: boolean = false;
  canCastling: boolean = true;
  checkFromWho: Cell | null = null;
  hasMoved: boolean = false;
  constructor(color: Colors, cell: Cell){
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.KING; 
  }

  public isCellCheck(target: Cell): boolean {
    const kingPosition = this.cell;
    const board = this.cell.board;
    let Threat = this.checkFromWho;
    if(this.checkFromWho){
      // if(this.isCheck && target !== Threat &&
      //   ((target.x === this.checkFromWho.x && Threat?.piece?.canMoveDowngraded(this.cell)) ||
      //   (target.y === this.checkFromWho.y && Threat?.piece?.canMoveDowngraded(this.cell)) || 
      //   (((Math.abs(this.cell.x - target.x) === Math.abs(this.cell.y - target.y)) &&
      //   (Math.abs(target.x - (Threat as Cell).x) === Math.abs(target.y - (Threat as Cell).y))) && Threat?.piece?.canMoveDowngraded(this.cell)))){
      //   return true;
      // }
      if(this.isCheck && target !== Threat &&
        (target.x === this.checkFromWho.x && Threat?.piece?.canMoveDowngraded(this.cell)) &&
        Threat.piece.name !== PiecesNames.BISHOP){
        return true;
      }
      if(this.isCheck && target !== Threat &&
        (target.y === this.checkFromWho.y && Threat?.piece?.canMoveDowngraded(this.cell)) &&
        Threat.piece.name !== PiecesNames.BISHOP){
        return true;
      }
      if(this.isCheck && target !== Threat &&
        (((Math.abs(this.cell.x - target.x) === Math.abs(this.cell.y - target.y)) &&
        (Math.abs(target.x - (Threat as Cell).x) === Math.abs(target.y - (Threat as Cell).y))) && Threat?.piece?.canMoveDowngraded(this.cell)) &&
        Threat.piece.name !== PiecesNames.ROOK){
        return true;
      }
    }
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const opponentPiece = board.getCell(col, row);
        const direction = opponentPiece.piece?.color === Colors.BLACK ? 1 : -1;
        if(opponentPiece.piece && opponentPiece.piece.name === PiecesNames.KING && (opponentPiece.piece as King)?.canMoveDowngraded(target) && opponentPiece.piece?.color !== kingPosition.piece?.color){
          return true;
        }
        if(opponentPiece.piece && opponentPiece.piece.name === PiecesNames.PAWN && ((target.x === opponentPiece.x + 1 && target.y === opponentPiece.y + direction) || target.x === opponentPiece.x - 1 && target.y === opponentPiece.y + direction) && opponentPiece.piece?.color !== kingPosition.piece?.color){
          return true;
        }
        // if (opponentPiece.piece && (opponentPiece.piece.name === PiecesNames.QUEEN || opponentPiece.piece.name === PiecesNames.ROOK) && opponentPiece.piece?.color !== kingPosition.piece?.color && (opponentPiece.isEmptyHorizontal(target) || opponentPiece.isEmptyVertical(target))) {
        //   return true;
        // }
        // if (opponentPiece.piece && (opponentPiece.piece.name === PiecesNames.QUEEN || opponentPiece.piece.name === PiecesNames.BISHOP) && opponentPiece.piece?.color !== kingPosition.piece?.color && opponentPiece.isEmptyDiagonal(target)) {
        //   return true;
        // }
        if (opponentPiece.piece && opponentPiece.piece.name !== PiecesNames.PAWN && opponentPiece.piece.name !== PiecesNames.KING && opponentPiece.piece?.color !== kingPosition.piece?.color && opponentPiece.piece?.canMoveDowngraded(target)) {
          return true;
        }
      }
    }
    return false;
  }

  public canMove(target: Cell): boolean {
    if(!super.canMove(target)){
      return false;
    }
    if(this.isCellCheck(target)){
      return false;
    }
    if (target.piece && target.piece.isProtected()) {
      return false;
    }
    if(this.canCastling == true && this.color == Colors.WHITE&& this.cell.x == 4 && this.cell.y == 7 && (target.x == 6) && this.canCastling&& this.cell.isEmptyHorizontal(target) && this.cell.board.getCell(7, 7).piece?.name == PiecesNames.ROOK && this.isCheck == false && this.cell.board.getCell(6, 7).isEmpty() && this.cell.board.getCell(5, 7).isEmpty()){
      return true;
    }
    if(this.canCastling == true && this.color == Colors.WHITE&& this.cell.x == 4 && this.cell.y == 7 && (target.x == 2) && this.canCastling&& this.cell.isEmptyHorizontal(target) && this.cell.board.getCell(0, 7).piece?.name == PiecesNames.ROOK && this.isCheck == false && this.cell.board.getCell(1, 7).isEmpty() && this.cell.board.getCell(2, 7).isEmpty()&& this.cell.board.getCell(3, 7).isEmpty()){
      return true;
    }
    if(this.canCastling == true  && this.color == Colors.BLACK && this.cell.x == 4 && this.cell.y == 0 && (target.x == 6)  && this.canCastling && this.cell.isEmptyHorizontal(target)  && this.cell.board.getCell(7, 0).piece?.name == PiecesNames.ROOK  && this.isCheck == false  && this.cell.board.getCell(6, 0).isEmpty()  && this.cell.board.getCell(5, 0).isEmpty()){
      return true;
    }
    if(this.canCastling == true  && this.color == Colors.BLACK && this.cell.x == 4 && this.cell.y == 0 && (target.x == 2)  && this.canCastling && this.cell.isEmptyHorizontal(target)  && this.cell.board.getCell(0, 0).piece?.name == PiecesNames.ROOK  && this.isCheck == false  && this.cell.board.getCell(1, 0).isEmpty()  && this.cell.board.getCell(2, 0).isEmpty() && this.cell.board.getCell(3, 0).isEmpty()){
      return true;
    }
    
    const x = Math.abs(this.cell.x - target.x);
    const y = Math.abs(this.cell.y - target.y);
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx <= 1 && dy <= 1);
  }
  public canMoveDowngraded(target: Cell): boolean {
    if(!super.canMove(target)){
      return false;
    }
    if (target.piece && target.piece.isProtected()) {
      return false;
    }
    
    const x = Math.abs(this.cell.x - target.x);
    const y = Math.abs(this.cell.y - target.y);
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx <= 1 && dy <= 1);
  }
  public canMoveForProtection(target: Cell): boolean{
    if(!super.canMoveForProtection(target)){
      return false
    }
    const x = Math.abs(this.cell.x - target.x);
    const y = Math.abs(this.cell.y - target.y);
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx <= 1 && dy <= 1);
  }
  public movePiece(target: Cell): void {
    super.movePiece(target);
    if(this.color == Colors.WHITE){
      if(this.canCastling == true && this.hasMoved == false && target.x == 6 && target.y == 7){
        new Rook(Colors.WHITE, this.cell.board.getCell(5, 7));
        this.cell.board.getCell(7, 7).piece = null;
        this.canCastling = false;
      }
      if(this.canCastling == true && this.hasMoved == false && target.x == 2 && target.y == 7){
        new Rook(Colors.WHITE, this.cell.board.getCell(3, 7));
        this.cell.board.getCell(0, 7).piece = null;
        this.canCastling = false;
      }
    }
    if(this.color == Colors.BLACK){
      if(this.canCastling == true && this.hasMoved == false && target.x == 6 && target.y == 0){
        new Rook(Colors.BLACK, this.cell.board.getCell(5, 0));
        this.cell.board.getCell(7, 0).piece = null;
        this.canCastling = false;
      }
      if(this.canCastling == true && this.hasMoved == false && target.x == 2 && target.y == 0){
        new Rook(Colors.BLACK, this.cell.board.getCell(3, 0));
        this.cell.board.getCell(0, 0).piece = null;
        this.canCastling = false;
      }
    }
    this.hasMoved = true;
    if(this.hasMoved == true){
      this.canCastling = false;
    }
  }
}