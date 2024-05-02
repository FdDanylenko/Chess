import logo from "../../assets/pieces-png/pawn-b.png";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { King } from "./King";
import { PiecesNames } from "./PiecesNames";

export class Piece {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: PiecesNames;
  id: number;
  strength: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.piece = this;
    this.logo = null;
    this.name = PiecesNames.PIECE;
    this.id = Math.random();
    this.strength = 10;
  }

  public isProtected(): boolean {
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const allyPiece = board.getCell(col, row);
        if (
          allyPiece.piece &&
          allyPiece.piece.color === this.color &&
          allyPiece.piece.canMoveForProtection(this.cell)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  public canMove(target: Cell): boolean {
    let myKing: Cell | void = this.findAllyKing(this.color);
    let Threat: Cell | null = (myKing.piece as King).checkFromWho;
    if (target.piece?.color === this.color) {
      return false;
    }
    let horizontal: boolean = false;
    let vertical: boolean = false;
    let diagonal: boolean = false;

    const board = this.cell.board;
    let enemyIsThreating = false;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const opponentPiece = board.getCell(col, row);
        if (
          this.name !== PiecesNames.KING &&
          opponentPiece.piece &&
          opponentPiece.isEnemy(myKing) &&
          opponentPiece.isEmptyVertical(this.cell) &&
          (opponentPiece.piece.name === PiecesNames.QUEEN ||
            opponentPiece.piece.name === PiecesNames.ROOK) &&
          this.cell.isEmptyVertical(myKing) &&
          opponentPiece.x === myKing.x &&
          this.cell.x === myKing.x &&
          target.x !== opponentPiece.x
        ) {
          enemyIsThreating = true;
        }
        if (
          this.name !== PiecesNames.KING &&
          opponentPiece.piece &&
          opponentPiece.isEnemy(myKing) &&
          opponentPiece.isEmptyHorizontal(this.cell) &&
          (opponentPiece.piece.name === PiecesNames.QUEEN ||
            opponentPiece.piece.name === PiecesNames.ROOK) &&
          this.cell.isEmptyHorizontal(myKing) &&
          opponentPiece.y === myKing.y &&
          this.cell.y === myKing.y &&
          target.y !== opponentPiece.y
        ) {
          enemyIsThreating = true;
        }
        if (
          this.name !== PiecesNames.KING &&
          opponentPiece.piece &&
          opponentPiece.isEnemy(myKing) &&
          opponentPiece.isEmptyDiagonal(this.cell) &&
          (opponentPiece.piece.name === PiecesNames.QUEEN ||
            opponentPiece.piece.name === PiecesNames.ROOK) &&
          this.cell.isEmptyDiagonal(myKing) &&
          Math.abs(opponentPiece.x - myKing.x) ===
            Math.abs(opponentPiece.y - myKing.y) &&
          Math.abs(this.cell.x - myKing.x) ===
            Math.abs(this.cell.y - myKing.y) &&
          Math.abs(target.x - opponentPiece.x) !==
            Math.abs(target.y - opponentPiece.y)
        ) {
          enemyIsThreating = true;
        }
      }
    }
    if (enemyIsThreating) {
      return false;
    }

    if (Threat !== null) {
      if (myKing.x === (myKing.piece as King).checkFromWho?.x) {
        const min = Math.min(myKing.y, Threat.y);
        const max = Math.max(myKing.y, Threat.y);
        if (target.x === myKing.x && target.y < max && target.y > min) {
          vertical = true;
          return true;
        }
      }
      if (myKing.y === (myKing.piece as King).checkFromWho?.y) {
        const min = Math.min(myKing.x, Threat.x);
        const max = Math.max(myKing.x, Threat.x);
        if (target.y === myKing.y && target.x < max && target.x > min) {
          horizontal = true;
          return true;
        }
      }
      if (
        Math.abs(myKing.x - target.x) === Math.abs(myKing.y - target.y) &&
        Math.abs(target.x - (Threat as Cell).x) ===
          Math.abs(target.y - (Threat as Cell).y) &&
        Math.abs(myKing.x - Threat.x) === Math.abs(myKing.y - Threat.y) &&
        target.x >= Math.min(myKing.x, Threat.x) &&
        target.x <= Math.max(myKing.x, Threat.x) &&
        target.y >= Math.min(myKing.y, Threat.y) &&
        target.y <= Math.max(myKing.y, Threat.y)
      ) {
        diagonal = true;
        return true;
      }
      if (
        (myKing.piece as King).isCheck &&
        this.name !== PiecesNames.KING &&
        (myKing.piece as King).checkFromWho !== target &&
        !horizontal &&
        !vertical &&
        !diagonal
      ) {
        return false;
      }
    }
    return true;
  }
  public canMoveDowngraded(target: Cell): boolean {
    if (target.piece?.color === this.color) {
      return false;
    }
    return true;
  }
  public canKingMove(): boolean {
    const myKing: Cell = this.findAllyKing(this.color);
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (myKing.piece?.canMove(targetCell)) {
          return true;
        }
      }
    }
    return false;
  }
  public canPieceMove(): boolean {
    let thisPiece = this;
    const board = this.cell.board;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = board.getCell(row, col);
        if (thisPiece.canMove(targetCell)) {
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
        if (
          target.piece &&
          target.piece.canMove(targetCell) &&
          targetCell.piece?.name === PiecesNames.KING &&
          targetCell.piece.color !== target.piece?.color
        ) {
          (targetCell.piece as King).isCheck = true;
          (targetCell.piece as King).checkFromWho = target;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if (
                findOtherPiece.piece?.canPieceMove() &&
                findOtherPiece.piece?.color !== this.color
              ) {
                otherMoves += 1;
              }
            }
          }
          if (
            !(targetCell.piece as King).canKingMove() &&
            (targetCell.piece as King).isCheck &&
            otherMoves === 0
          ) {
            (targetCell.piece as King).isCheckMate = true;
            result = true;
          }
        } else if (
          target.piece &&
          !target.piece.canMove(targetCell) &&
          targetCell.piece?.name === PiecesNames.KING &&
          targetCell.piece.color !== target.piece?.color
        ) {
          (targetCell.piece as King).isCheck = false;
          (targetCell.piece as King).checkFromWho = null;
          let otherMoves: number = 0;
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              const findOtherPiece = target.board.getCell(row, col);
              if (
                findOtherPiece.piece?.canPieceMove() &&
                findOtherPiece.piece?.color === targetCell.color
              ) {
                otherMoves += 1;
              }
            }
          }
          if (
            !(targetCell.piece as King).canKingMove() &&
            otherMoves === 0 &&
            !(targetCell.piece as King).isCheck
          ) {
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
    if (enemy.piece === null) {
      (target.piece as King).isCheck = false;
      return false;
    }
    if (enemy.piece.color === target.piece?.color) {
      (target.piece as King).isCheck = false;
      return false;
    }
    if (
      enemy.piece &&
      enemy.piece.canMove(target) &&
      target.piece?.name === PiecesNames.KING &&
      enemy.piece.color !== target.piece?.color
    ) {
      (target.piece as King).isCheck = true;
      (target.piece as King).checkFromWho = enemy;
      let otherMoves: number = 0;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const findOtherPiece = target.board.getCell(row, col);
          if (
            findOtherPiece.piece?.canPieceMove() &&
            findOtherPiece.piece?.color !== this.color
          ) {
            otherMoves += 1;
          }
        }
      }
      if (
        !(target.piece as King).canKingMove() &&
        (target.piece as King).isCheck &&
        otherMoves === 0
      ) {
        (target.piece as King).isCheckMate = true;
      }
      result = true;
    } else if (
      enemy.piece &&
      !enemy.piece.canMove(target) &&
      target.piece?.name === PiecesNames.KING &&
      enemy.piece.color !== target.piece?.color
    ) {
      (target.piece as King).isCheck = false;
      (target.piece as King).checkFromWho = enemy;
      let otherMoves: number = 0;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const findOtherPiece = target.board.getCell(row, col);
          if (
            findOtherPiece.piece?.canPieceMove() &&
            findOtherPiece.piece?.color === target.color
          ) {
            otherMoves += 1;
          }
        }
      }
      if (
        !(target.piece as King).canKingMove() &&
        otherMoves === 0 &&
        !(target.piece as King).isCheck
      ) {
        (target.piece as King).isStaleMate = true;
        result = true;
      }
      result = false;
    }
    return result;
  }
  public findAllyKing(color: Colors): Cell {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetCell = this.cell.board.getCell(row, col);
        if (
          targetCell.piece &&
          targetCell.piece?.name === PiecesNames.KING &&
          targetCell.piece.color == this.color
        ) {
          return targetCell;
        }
      }
    }
    return this.cell.board.getCell(0, 0);
  }
  public canMoveForProtection(target: Cell): boolean {
    if (target.x === this.cell.x && target.y === this.cell.y) {
      return false;
    }
    return true;
  }
  public movePiece(target: Cell) {
    this.checkIfCheck(target);
    // this.cell.board.endGame = true;
  }
}
