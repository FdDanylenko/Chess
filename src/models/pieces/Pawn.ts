import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Piece } from "./Piece";
import { PiecesNames } from './PiecesNames';
import whiteLogo from '../../assets/pieces-png/pawn-w.png';
import blackLogo from '../../assets/pieces-png/pawn-b.png';
import { King } from "./King";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";
import { Knight } from "./Knight";
export class Pawn extends Piece{
  isFirstStep: boolean = true;
  justPassanted: boolean = false;
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
    if(target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && (this.cell.isEnemy(target) || target.availableToPassant)) {
      return true;
    }
    return false;
  }
  public canMoveForProtection(target: Cell): boolean{
    if(!super.canMoveForProtection(target)){
      return false
    }
    const direction = this.cell.piece?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.piece?.color === Colors.BLACK ? 2 : -2;

    if((target.y === this.cell.y + direction || this.isFirstStep && (target.y === this.cell.y + firstStepDirection)) && target.x == this.cell.x && this.cell.board.getCell(target.x, target.y).isEmpty()){
      return true;
    }
    if(target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && (this.cell.isEnemy(target) || target.availableToPassant)) {
      return true;
    }
    return false;
  }
  public movePiece(target: Cell): void {
    if(target.availableToPassant){
      const opositeDirection = this.cell.piece?.color === Colors.BLACK ? -1 : 1;
      console.log("Cell behind: " + (target.x) + " " + (target.y + opositeDirection));
      target.board.getCell(target.x, (target.y + opositeDirection)).piece = null;
    }
    super.movePiece(target);
    const abs = Math.abs(this.cell.y - target.y);
    if(abs === 2 && this.cell.piece?.name === PiecesNames.PAWN){
      if(this.color === Colors.WHITE){
        this.cell.board.getCell(target.x, target.y+1).availableToPassant = true;
      }
      if(this.color === Colors.BLACK){
        this.cell.board.getCell(target.x, target.y-1).availableToPassant = true;
      }
    }
    //this.isFirstStep = false;
    if (this.shouldPromote(target)) {
      this.promoteToQueen();
    }
  }
  public shouldPromote(target: Cell): boolean {
    return (this.color === Colors.BLACK && target.y === 7) || (this.color === Colors.WHITE && target.y === 0);
  }
  private promoteToQueen(): void {
    const queen = new Queen(this.color, this.cell);
    this.cell.setPiece(queen);
  }
  // public choosePromotionPiece(chosenPiece: PiecesNames): void{
  //   //const selectedPiece = showPromotionDialog();
  //   switch (chosenPiece) {
  //     case 'Queen':
  //       this.cell.setPiece(new Queen(this.color, this.cell));
  //       break;
  //     case 'Bishop':
  //       this.cell.setPiece(new Bishop(this.color, this.cell));
  //       break;
  //     case 'Knight':
  //       this.cell.setPiece(new Knight(this.color, this.cell));
  //       break;
  //     case 'Rook':
  //       this.cell.setPiece(new Rook(this.color, this.cell));
  //       break;
  //     default:
  //       this.cell.setPiece(new Knight(this.color, this.cell));
  //   }
  // }
}