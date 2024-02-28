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

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  let moveSound = require('./../assets/move-self.mp3');
  let captureSound = require('./../assets/capture.mp3');
  function PlaySound(sound: any){
    new Audio(sound).play();
  }
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  function click(cell: Cell){
    if(selectedCell && selectedCell !== cell && selectedCell.piece?.canMove(cell)){
      cell.piece ? PlaySound(captureSound) : PlaySound(moveSound);
      let catchError: number = selectedCell.movePiece(cell);
      if(catchError === 4){
        return false;
      }
      setSelectedCell(null);
      let enemyKing: Cell | void = board.findKing(board, getOppositeColor(currentPlayer));
      let myKing: Cell | void = board.findKing(board, currentPlayer.color);
      if(((enemyKing as Cell).piece as King).isCheckMate){
        board.setWinner(currentPlayer.color, "Checkmate")
      }
      if(((myKing as Cell).piece as King).isCheckMate){
        board.setWinner(getOppositeColor(currentPlayer), "Checkmate")
      }
      if(((enemyKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      if(((myKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      swapPlayer();
    }else{
      if(cell.piece?.color === currentPlayer?.color && !board.endGame){
        setSelectedCell(cell);
      }
    }
  }
  function getOppositeColor(currentPlayer: Player){
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