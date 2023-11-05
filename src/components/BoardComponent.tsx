import React, {FC, useEffect, useState} from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import userEvent from "@testing-library/user-event";

interface BoardProps{
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell){
    if(cell.piece){
    }
    if(selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(cell)){
      selectedCell.movePiece(cell);
      setSelectedCell(null);
    }else{
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  function highlightCells(){
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard(){
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return(
    <div className="board">
      {board.cells.map((row, index) => 
        <React.Fragment key={index}>
          {row.map(cell => 
            <CellComponent click={click} cell={cell} key={cell.id}
            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default BoardComponent;