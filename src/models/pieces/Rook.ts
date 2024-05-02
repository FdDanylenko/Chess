import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from "./PiecesNames";
import whiteLogo from "../../assets/pieces-png/rook-w.png";
import blackLogo from "../../assets/pieces-png/rook-b.png";

export class Rook extends Piece {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.ROOK;
    this.strength = 50;
  }
  public canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) {
      return true;
    }
    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }
    return false;
  }
  public canMoveDowngraded(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) {
      return true;
    }
    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }
    return false;
  }
  public canMoveForProtection(target: Cell): boolean {
    if (!super.canMoveForProtection(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) {
      return true;
    }
    if (this.cell.isEmptyHorizontal(target)) {
      return true;
    }
    return false;
  }
}
