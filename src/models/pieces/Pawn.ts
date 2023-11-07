import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from './PiecesNames';
import whiteLogo from '../../assets/pieces-png/pawn-w.png';
import blackLogo from '../../assets/pieces-png/pawn-b.png';
import { King } from "./King";

export class Pawn extends Piece{
  isFirstStep: boolean = true;
  constructor(color: Colors, cell: Cell){
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = PiecesNames.PAWN; 
  }
  public canMove(target: Cell): boolean {
    if(!super.canMove(target)){
      return false
    }
    const direction = this.cell.piece?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.piece?.color === Colors.BLACK ? 2 : -2;

    if((target.y === this.cell.y + direction || this.isFirstStep && (target.y === this.cell.y + firstStepDirection)) && target.x == this.cell.x && this.cell.board.getCell(target.x, target.y).isEmpty()){
      return true;
    }
    if(target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && this.cell.isEnemy(target)) {
      return true;
    }
    return false;
  }
  public movePiece(target: Cell): void {
    super.movePiece(target);
    if(Math.abs(target.y-this.cell.y) == 2){
      this.enPasantIsAvailable = true;
    }
    this.isFirstStep = false;
  }
}