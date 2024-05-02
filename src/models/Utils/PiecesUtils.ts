import { Board } from "../Board";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { King } from "../pieces/King";
import { Piece } from "../pieces/Piece";
import { PiecesNames } from "../pieces/PiecesNames";

export class PiecesUtils {
  public static findKing(board: Board, color: Colors): Cell | void {
    const cells = board.cells.flat();
    return cells.find(
      (cell) => cell.piece?.color === color && cell.piece instanceof King
    );
  }
}
