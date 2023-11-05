import React, {FC} from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";

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
      {cell.piece?.logo && <img src={cell.piece.logo}></img>}
    </div>
  );
};

export default CellComponent;