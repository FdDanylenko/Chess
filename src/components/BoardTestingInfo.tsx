import React, {FC, useEffect, useState} from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import userEvent from "@testing-library/user-event";
import { Player } from "../models/Player";
import { King } from "../models/pieces/King";
import { PiecesNames } from "../models/pieces/PiecesNames";
import { Colors } from "../models/Colors";

interface BoardProps{
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player;
  swapPlayer: () => void;
}

const BoardTestingInfo: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  function click(cell: Cell){
    if(selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(cell)){
      let catchError: number = selectedCell.movePiece(cell);
      if(catchError === 4){
        return false;
      }
      setSelectedCell(null);
      //=====================================================================================================
      let enemyKing: Cell | void = board.findKing(board, getOpociteColor(currentPlayer));
      let myKing: Cell | void = board.findKing(board, currentPlayer.color);
      if(((enemyKing as Cell).piece as King).isCheckMate){
        board.setWinner(currentPlayer.color, "Checkmate")
      }
      if(((myKing as Cell).piece as King).isCheckMate){
        board.setWinner(getOpociteColor(currentPlayer), "Checkmate")
      }
      if(((enemyKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      if(((myKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      //=====================================================================================================
      swapPlayer();
    }else{
      if(cell.piece?.color === currentPlayer?.color){
        setSelectedCell(cell);
      }
    }
  }
  function getOpociteColor(currentPlayer: Player){
    if(currentPlayer.color === Colors.BLACK){
      return Colors.WHITE;
    }
    else{
      return Colors.BLACK;
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
    <div className="board test">
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

export default BoardTestingInfo;