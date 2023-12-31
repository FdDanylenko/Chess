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
    let myKing: Cell | void = this.findAllyKing(this.color);
    let Threat: Cell | null = (myKing.piece as King).checkFromWho;
    if(target.piece?.color === this.color){
      return false;
    }
    let horisontal: boolean = false;
    let vertical: boolean = false;
    let diagonal: boolean = false;
    if(Threat !== null){
      if(myKing.x === (myKing.piece as King).checkFromWho?.x){
        if(target.x === myKing.x){
          vertical = true;
          return true
        }
      }
      if(myKing.y === (myKing.piece as King).checkFromWho?.y){
        if(target.y === myKing.y){
          horisontal = true;
          return true
        }
      }
      if((Math.abs(myKing.x - target.x) === Math.abs(myKing.y - target.y)) && (Math.abs(target.x - (Threat as Cell).x) === Math.abs(target.y - (Threat as Cell).y)) && (Math.abs(myKing.x - Threat.x) === Math.abs(myKing.y - Threat.y)) && (
        (Math.abs(myKing.x - target.x)) <= (Math.abs(target.x - (Threat as Cell).x))
      )){
        diagonal = true;
        return true;
      }
      if((myKing.piece as King).isCheck && this.name !== PiecesNames.KING && (myKing.piece as King).checkFromWho !== target && (!horisontal && !vertical && !diagonal)){
        return false;
      }
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
  public canPieceMove(theColor: Colors): boolean{
    let thisPiece = this;
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (thisPiece.canMove(targetCell)){
          return true;
        }
      }
    }
    return false;
  }
  public checkIfCheck(target: Cell): boolean {
    var result: boolean = false;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = target.board.getCell(row, col);
        if (target.piece && target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color) {
          (targetCell.piece as King).isCheck = true;
          (targetCell.piece as King).checkFromWho = target;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if(findOtherPiece.piece?.canPieceMove(target.piece.color) && findOtherPiece.piece?.color !== this.color){
                otherMoves += 1;
              }
            }
          }
          if(!(targetCell.piece as King).canKingMove() && (targetCell.piece as King).isCheck && otherMoves === 0){
            (targetCell.piece as King).isCheckMate = true;
            result = true;
          }
        }
        else if(target.piece && !target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color){
          (targetCell.piece as King).isCheck = false;
          (targetCell.piece as King).checkFromWho = null;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if(findOtherPiece.piece?.canPieceMove(target.piece.color) && findOtherPiece.piece?.color === targetCell.color){
                otherMoves += 1;
              }
            }
          }  
          if(!(targetCell.piece as King).canKingMove() && otherMoves === 0 && !(targetCell.piece as King).isCheck){
            (targetCell.piece as King).isStaleMate = true;
            result = true;
          }
        }
      }
    }
    return result;
  }
  public recheckIfCheck(target: Cell): boolean {
    var result: boolean = false;
    const enemy = this.cell;
    if(enemy.piece === null){
      (target.piece as King).isCheck = false;
      return false;
    }
    if(enemy.piece.color === target.piece?.color){
      (target.piece as King).isCheck = false;
      return false;
    }
        if (enemy.piece && enemy.piece.canMove(target) && target.piece?.name === PiecesNames.KING && enemy.piece.color !== target.piece?.color) {
          (target.piece as King).isCheck = true;
          (target.piece as King).checkFromWho = enemy;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if(findOtherPiece.piece?.canPieceMove(target.piece.color) && findOtherPiece.piece?.color !== this.color){
                otherMoves += 1;
              }
            }
          }
          if(!(target.piece as King).canKingMove() && (target.piece as King).isCheck && otherMoves === 0){
            (target.piece as King).isCheckMate = true;
          }
          result = true;
        }
        else if(enemy.piece && !enemy.piece.canMove(target) && target.piece?.name === PiecesNames.KING && enemy.piece.color !== target.piece?.color){
          (target.piece as King).isCheck = false;
          (target.piece as King).checkFromWho = enemy;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if(findOtherPiece.piece?.canPieceMove(target.piece.color) && findOtherPiece.piece?.color === target.color){
                otherMoves += 1;
              }
            }
          }
          if(!(target.piece as King).canKingMove() && otherMoves === 0 && !(target.piece as King).isCheck){
            (target.piece as King).isStaleMate = true;
            result = true;
          }
          result = false;
        }
    return result;
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
    this.checkIfCheck(target);
    this.cell.board.endGame = true;
  }
}