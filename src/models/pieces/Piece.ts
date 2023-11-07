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

  public canMove(target: Cell): boolean{
    if(target.piece?.color === this.color){
      return false;
    }
    if(target.piece?.name === PiecesNames.KING && target.piece?.color !== this.color){
      (target.piece as King).isCheck = true;
      console.log("Check");
    }
    return true;
  }
  public movePiece(target: Cell){
    
  }
}

