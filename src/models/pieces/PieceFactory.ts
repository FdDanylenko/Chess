import { Board } from "../Board";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { Colors } from "../Colors";

export class PieceFactory {
  public fromFenChar(board: Board, fenChar: string, x: number, y: number): Piece {
    switch (fenChar) {
      case "p":
        return new Pawn(Colors.BLACK, board.getCell(x, y));
      case "P":
        return new Pawn(Colors.WHITE, board.getCell(x, y));

      case "r":
        return new Rook(Colors.BLACK, board.getCell(x, y));
      case "R":
        return new Rook(Colors.WHITE, board.getCell(x, y));

      case "n":
        return new Knight(Colors.BLACK, board.getCell(x, y));
      case "N":
        return new Knight(Colors.WHITE, board.getCell(x, y));

      case "b":
        return new Bishop(Colors.BLACK, board.getCell(x, y));
      case "B":
        return new Bishop(Colors.WHITE, board.getCell(x, y));

      case "q":
        return new Queen(Colors.BLACK, board.getCell(x, y));
      case "Q":
        return new Queen(Colors.WHITE, board.getCell(x, y));

      case "k":
        return new King(Colors.BLACK, board.getCell(x, y));
      case "K":
        return new King(Colors.WHITE, board.getCell(x, y));

      default:
        throw new Error("Unknown FEN char!");
    }
  }
}