import { Cell } from "../Cell";
import { Bishop } from "../pieces/Bishop";
import { Knight } from "../pieces/Knight";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { Piece } from "../pieces/Piece";
import { Color, PieceNames } from "../pieces/types";
import { Pawn } from "../pieces/Pawn";
import { Colors } from "../Colors";

export class PawnTransform {
  public isPawnOnLastLine(color: Color, selectedCell: Cell, target: Cell): boolean {
    const lastLine = color === Color.WHITE ? 0 : 7;
    return selectedCell?.piece instanceof Pawn && target.y === lastLine;
  }
  public transform(selectedCell: Cell, target: Cell, chosenPiece: PieceNames, color: Colors): void {
    selectedCell.piece = null;
    switch (chosenPiece) {
      case PieceNames.QUEEN:
        target.piece = new Queen(color, target);
        return;
      case PieceNames.ROOK:
        target.piece = new Rook(color, target);
        return;
      case PieceNames.BISHOP:
        target.piece = new Bishop(color, target);
        return;
      case PieceNames.KNIGHT:
        target.piece = new Knight(color, target);
        return;
      default:
        return;
    }
  }
}