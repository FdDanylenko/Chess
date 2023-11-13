import logo from '../../assets/pieces-png/pawn-b.png'
import { Board } from '../Board';
import { Cell } from "../Cell";
import { Colors } from "../Colors"
import { King } from './King';
import { PiecesNames } from './PiecesNames';

export class Piece{
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: PiecesNames;
  enPasantIsAvailable: boolean = false;
  id: number;

  constructor(color: Colors, cell: Cell){
    this.color = color;
    this.cell = cell;
    this.cell.piece = this;
    this.logo = null;
    this.name = PiecesNames.PIECE
    this.id = Math.random();
  }

  public isProtected(): boolean {
    const board = this.cell.board;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const allyPiece = board.getCell(col, row);
        if (allyPiece.piece && allyPiece.piece.color === this.color && allyPiece.piece.canMoveForProtection(this.cell)) {
          return true;
        }
      }
    }
    return false;
  }

  public canMove(target: Cell): boolean{
    console.log("CanMove is called");
    if(target.piece?.color === this.color){
      return false;
    }
    return true;
  }
  public canKingMove(): boolean{
    const myKing: Cell = this.findAllyKing(this.color);
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (myKing.piece?.canMove(targetCell)){
          return true;
        }
      }
    }
    return false;
  }
  public checkIfCheck(target: Cell): boolean {
    console.log("CheckForCheck is called");
    const board = target.board;
    console.log(target.x + "; " + target.y);
    console.log(target.piece?.name);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (target.piece && target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color) {
          (targetCell.piece as King).isCheck = true;
          if(!(targetCell.piece as King).canKingMove()){
            (targetCell.piece as King).isCheckMate = true;
            console.log("Checkmate for "  + targetCell.piece.color);
          }
          console.log("Check for "  + targetCell.piece.color);
          return true;
        }
        else if(target.piece && !target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color){
          (targetCell.piece as King).isCheck = false;
          if(!(targetCell.piece as King).canKingMove()){
            (targetCell.piece as King).isStealMate = true;
            console.log("Stealmate");
          }
          console.log("No check");
          return true;
        }
      }
    }
    return false;
  }
  public findAllyKing(color: Colors): Cell{
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = this.cell.board.getCell(row, col);
        if (targetCell.piece && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color == this.color) {
          return targetCell;
        }
      }
    }
    return this.cell.board.getCell(0,0);
  }
  public canMoveForProtection(target: Cell): boolean{
    if(target.x === this.cell.x && target.y === this.cell.y){
      return false;
    }
    return true;
  }
  public movePiece(target: Cell){
    this.cell.addMove(this.cell, target);
    this.checkIfCheck(target);
  }
}