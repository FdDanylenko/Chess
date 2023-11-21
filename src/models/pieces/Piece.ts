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
  strength: number = 0;
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
    if(target.piece?.color === this.color){
      return false;
    }
    if(target.board.endGame){
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
  public canPieceMove(): boolean{
    const myPiece: Cell = this.cell;
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (myPiece.piece?.canMove(targetCell)){
          return true;
        }
      }
    }
    return false;
  }

  // Функція отримує короля і загрозу для нього, шукає союзну фігуру короля і клітинку в яку
  // б вона могла похрдити щоб при повторній перевірці шаху загроза шаху переставала існувати
  public tryFindSaveMove(threatCell: Cell, thisKingCell: Cell):boolean{
    let savedThreatCell = threatCell;
    let result: boolean = false;  

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        //Вибір координат фігури
        let savePossiblePieceToMove: Cell = thisKingCell.board.getCell(row, col);
        let savePossiblePieceToMovePiece = thisKingCell.board.getCell(row, col).piece;
        //Перевірка чи є вона союзною
        if(thisKingCell.board.getCell(row, col).piece && thisKingCell.board.getCell(row, col).piece?.color === thisKingCell.piece?.color && thisKingCell.board.getCell(row, col).piece?.name !== PiecesNames.KING){
              if(thisKingCell.board.getCell(row, col).piece?.canMove(savedThreatCell)){
                result = true;
                return result;
              }
          for (let nrow = 0; nrow < 8; nrow++) {
            for (let ncol = 0; ncol < 8; ncol++) {
              //Вибір клітинки для ходу
              if(thisKingCell.board.getCell(row, col).piece?.canMove(thisKingCell.board.getCell(nrow, ncol))){
                result = true;
              }
              if (!thisKingCell.board.getCell(nrow, ncol).piece){
                thisKingCell.board.getCell(nrow, ncol).setPiece(thisKingCell.board.getCell(row, col).piece);
                if(savedThreatCell.piece?.canMove(thisKingCell) === false){
                  result = true;
                }
                thisKingCell.board.getCell(nrow, ncol).setPiece(null);
                thisKingCell.board.getCell(nrow, ncol).piece = null;
              }
              thisKingCell.board.getCell(row, col).piece = savePossiblePieceToMovePiece;
              if(result){
                return result;
              }
            }
          }
        }
      }
    }
    return result;
  }

  public checkIfCheck(target: Cell): boolean {
    var result: boolean = false;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = target.board.getCell(row, col);
        if(target.piece && !target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color){
          (targetCell.piece as King).isCheck = false;
          (targetCell.piece as King).checkFromWho = null;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if(findOtherPiece.piece?.canPieceMove() && findOtherPiece.piece?.color === targetCell.color){
                otherMoves += 1;
              }
            }
          }  
          if(!(targetCell.piece as King).canKingMove() && otherMoves === 0 && !(targetCell.piece as King).isCheck){
            (targetCell.piece as King).isStaleMate = true;
            result = false;
          }
        }
        else if (target.piece && target.piece.canMove(targetCell) && targetCell.piece?.name === PiecesNames.KING && targetCell.piece.color !== target.piece?.color) {
          (targetCell.piece as King).isCheck = true;
          (targetCell.piece as King).checkFromWho = target;
          const checkFromWho = (targetCell.piece as King).checkFromWho;
          if(!(targetCell.piece as King).canKingMove() && (targetCell.piece as King).isCheck && checkFromWho !== null){
            (targetCell.piece as King).isCheckMate = true;
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
          const checkFromWho = (target.piece as King).checkFromWho;
          if(!(target.piece as King).canKingMove() && (target.piece as King).isCheck && checkFromWho !== null/* && (target.piece as King).tryFindSaveMove(checkFromWho, (target.piece as King).cell) === false*/){
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
              if(findOtherPiece.piece?.canPieceMove() && findOtherPiece.piece?.color === target.color){
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
    //this.cell.addMove(this.cell, target);
    this.recheckIfCheck(target);
    //this.cell.board.endGame = true;
  }
}