import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from './PiecesNames';
import whiteLogo from '../../assets/pieces-png/knight-w.png';
import blackLogo from '../../assets/pieces-png/knight-b.png';
import { King } from "./King";

export class Knight extends Piece{
  constructor(color: Colors, cell: Cell){
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.KNIGHT;
    this.strength = 30;
  }
  public canMove(target: Cell): boolean {
    if(!super.canMove(target)){
      return false
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx === 1 && dy === 2) || (dy === 1 && dx === 2)
  }
  public canMoveDowngraded(target: Cell): boolean {
    if(!super.canMoveDowngraded(target)){
      return false
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx === 1 && dy === 2) || (dy === 1 && dx === 2)
  }
  public canMoveForProtection(target: Cell): boolean{
    if(!super.canMoveForProtection(target)){
      return false
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx === 1 && dy === 2) || (dy === 1 && dx === 2);
  }
}