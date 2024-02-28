import React, {FC} from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { King } from "../models/pieces/King";

interface CellProps{
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return(
    <div 
      className={['cell', cell.color, selected ? "selected" : ""].join(' ')}
      onClick={() => click(cell)}
    >
      {cell.available && !cell.piece && <div className="available"></div>}
      {cell.available && cell.piece && <div className="availableToTake"></div>}
      {cell.availableToPasant && <div className="enPassant"></div>}
      {(cell.piece as King)?.isCheckMate && <div className="toWhoCheckmate"></div>}
      {(cell.piece as King)?.isCheck && <div className="toWhoCheck"></div>}
      {cell.piece?.logo && <img alt="Cell" src={cell.piece.logo}></img>}
    </div>
  );
};

export default CellComponent;