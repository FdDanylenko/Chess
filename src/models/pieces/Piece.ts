import logo from '../../assets/pieces-png/pawn-b.png'
import { Board } from '../Board';
import { Cell } from "../Cell";
import { Colors } from "../Colors"
import { King } from './King';

export enum PiecesNames{
  PIECE = 'Piece',
  KING = 'King',
  QUEEN = 'Queen',
  BISHOP = 'Bishop',
  KNIGHT = 'Knight',
  ROOK = 'Rook',
  PAWN = 'Pawn'
}

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
    if(target.piece?.name === PiecesNames.KING){
      return false;
    }
    return true;
  }
  public movePiece(target: Cell){
    /*if(true){
      for (let i = 0; i < this.cell.board.cells.length; i++) {
        const row = this.cell.board.cells[i]
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          if (target.piece?.name == PiecesNames.KING && target.piece?.color !== this.color) {
            //target.piece?.isCheckMate? = true;
          }
        }
      }
    }*/
  }
}

