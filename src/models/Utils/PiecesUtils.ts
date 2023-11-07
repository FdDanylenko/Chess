import { Board } from "../Board";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { King } from "../pieces/King";
import { Piece } from "../pieces/Piece";
import { PiecesNames } from "../pieces/PiecesNames";

export class PiecesUtils {
  public static findPiecesByColor(board: Board, color: Colors, withKing: boolean): Piece[] {
    const pieces: Piece[] = [];
    const cells = board.cells.flat();
    cells.forEach((cell) => {
      if (!withKing && cell.piece && cell.piece.color === color && cell.piece.name !== PiecesNames.KING) {
        pieces.push(cell.piece);
      } else if (withKing && cell.piece && cell.piece.color === color) {
        pieces.push(cell.piece);
      }
    });

    return pieces;
  }
  public static findKing(board: Board, color: Colors): Cell | void {
    const cells = board.cells.flat();
    return cells.find((cell) => cell.piece?.color === color && cell.piece instanceof King);
  }
  public static findKingMoves(board: Board, king: Cell, withPieces: boolean): Cell[] {
    const kingMoves = [];
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;
        const newX = king?.x + xOffset;
        const newY = king?.y + yOffset;
        const cell = board.getCell(newX, newY);
        if (withPieces) kingMoves.push(cell);
        else if (!withPieces && (cell.isEmpty() || cell.piece instanceof King)) kingMoves.push(cell);
      }
    }
    return kingMoves;
  }
}