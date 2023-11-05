import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, PiecesNames } from "./Piece";
import whiteLogo from '../../assets/pieces-png/knight-w.png';
import blackLogo from '../../assets/pieces-png/knight-b.png';

export class Knight extends Piece{
  constructor(color: Colors, cell: Cell){
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.KNIGHT; 
  }
  public canMove(target: Cell): boolean {
    if(!super.canMove(target)){
      return false
    }
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    return (dx === 1 && dy === 2) || (dy === 1 && dx === 2)
  }
}