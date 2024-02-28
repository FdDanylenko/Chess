import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Piece } from "./pieces/Piece";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

export class Board{
  cells: Cell[][] =[];
  whiteLostPieces: Piece[] = [];
  blackLostPieces: Piece[] = [];
  whiteMoves: string[] = [];
  blackMoves: string[] = [];
  public endGame: boolean = false;
  public winner: string = "black";
  public reason: string = "time run out";
  public previousPasant: Cell | null = null;
  public promotionDialog: boolean = false;

  public initCells(){
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i+j)%2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) //green
        }
        else{
          row.push(new Cell(this, j, i, Colors.WHITE, null)) //white
        }
      }
      this.cells.push(row);
    }
  }

  public setWinner(_winner: string, _reason: string){
    this.endGame = true;
    this.winner = _winner;
    this.reason = _reason;
  }
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.blackLostPieces = this.blackLostPieces;
    newBoard.whiteLostPieces = this.whiteLostPieces;
    newBoard.blackMoves = this.blackMoves;
    newBoard.whiteMoves = this.whiteMoves;
    newBoard.endGame = this.endGame;
    newBoard.winner = this.winner;
    newBoard.reason = this.reason;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null){
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.piece?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number){
    return this.cells[y][x];
  }

  public findKing(board: Board, color: Colors): Cell | void {
    const cells = board.cells.flat();
    return cells.find((cell) => cell.piece?.color === color && cell.piece instanceof King);
  }

  public addPieces(){
    new King(Colors.WHITE, this.getCell(4, 7));
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
    //============================================
    new King(Colors.BLACK, this.getCell(4, 0));
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }
}
