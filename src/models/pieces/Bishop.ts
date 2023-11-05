import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece, PiecesNames } from "./Piece";
import whiteLogo from '../../assets/pieces-png/bishop-w.png';
import blackLogo from '../../assets/pieces-png/bishop-b.png';

export class Bishop extends Piece{
  constructor(color: Colors, cell: Cell){
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.BISHOP; 
  }

  public canMove(target: Cell): boolean {
    if(!super.canMove(target)){
      return false
    }
    if(this.cell.isEmptyDiagonal(target)){
      return true;
    }
    return false;
  }
}