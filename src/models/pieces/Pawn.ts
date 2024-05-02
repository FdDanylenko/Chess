import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from "./PiecesNames";
import whiteLogo from "../../assets/pieces-png/pawn-w.png";
import blackLogo from "../../assets/pieces-png/pawn-b.png";
import { Queen } from "./Queen";
export class Pawn extends Piece {
  isFirstStep: boolean = true;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.PAWN;
    this.strength = 10;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.piece?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.piece?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x == this.cell.x &&
      (Math.abs(target.y - this.cell.y) == 2
        ? this.cell.board.getCell(target.x, target.y - direction).isEmpty()
        : true) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      (this.cell.isEnemy(target) || target.availableToPasant)
    ) {
      return true;
    }
    return false;
  }
  public canMoveDowngraded(target: Cell): boolean {
    if (!super.canMoveDowngraded(target)) {
      return false;
    }
    const direction = this.cell.piece?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.piece?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x == this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      (this.cell.isEnemy(target) || target.availableToPasant)
    ) {
      return true;
    }
    return false;
  }
  public canMoveForProtection(target: Cell): boolean {
    if (!super.canMoveForProtection(target)) {
      return false;
    }
    const direction = this.cell.piece?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.piece?.color === Colors.BLACK ? 2 : -2;

    if (
      target.y === this.cell.y + direction ||
      (this.isFirstStep &&
        target.y === this.cell.y + firstStepDirection &&
        target.x == this.cell.x &&
        this.cell.board.getCell(target.x, target.y).isEmpty())
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      (this.cell.isEnemy(target) || target.availableToPasant)
    ) {
      return true;
    }
    return false;
  }
  public movePiece(target: Cell): void {
    if (target.availableToPasant) {
      const oppositeDirection =
        this.cell.piece?.color === Colors.BLACK ? -1 : 1;
      target.board.getCell(target.x, target.y + oppositeDirection).piece = null;
    }
    super.movePiece(target);
    const abs = Math.abs(this.cell.y - target.y);
    if (abs === 2 && this.cell.piece?.name === PiecesNames.PAWN) {
      if (this.color === Colors.WHITE) {
        this.cell.board.getCell(target.x, target.y + 1).availableToPasant =
          true;
      }
      if (this.color === Colors.BLACK) {
        this.cell.board.getCell(target.x, target.y - 1).availableToPasant =
          true;
      }
    }
    if (this.shouldPromote(target)) {
      this.promoteToQueen();
    }
  }
  public shouldPromote(target: Cell): boolean {
    return (
      (this.color === Colors.BLACK && target.y === 7) ||
      (this.color === Colors.WHITE && target.y === 0)
    );
  }
  private promoteToQueen(): void {
    const queen = new Queen(this.color, this.cell);
    this.cell.setPiece(queen);
  }
}
