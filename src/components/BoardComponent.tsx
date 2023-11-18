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
      let pieceCheck: boolean = cell.piece ? true : false;
      let catchError: number = selectedCell.movePiece(cell);
      if(catchError === 4){
        return false;
      }
      setSelectedCell(null);
      //=====================================================================================================
      let enemyKing: Cell | void = board.findKing(board, getOppociteColor(currentPlayer));
      let myKing: Cell | void = board.findKing(board, currentPlayer.color);
      if(((enemyKing as Cell).piece as King).isCheckMate){
        board.setWinner(currentPlayer.color, "Checkmate")
      }
      if(((myKing as Cell).piece as King).isCheckMate){
        board.setWinner(getOppociteColor(currentPlayer), "Checkmate")
      }
      if(((enemyKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      if(((myKing as Cell).piece as King).isStaleMate){
        board.setWinner("Draw", "StaleMate")
      }
      pieceCheck ? PlaySound(captureSound) : PlaySound(moveSound);
      //=====================================================================================================
      setSelectedCell(cell);
      swapPlayer();
    }else{
      if(cell.piece?.color === currentPlayer?.color){
        setSelectedCell(cell);
      }
    }
  }
  function getOppociteColor(currentPlayer: Player){
    if(currentPlayer.color === Colors.BLACK){
      return Colors.WHITE;
    }
    else{
      return Colors.BLACK;
    }
  }
  function getBotCells(){
    let botCells: Cell[] = [];
    for (let i = 0; i < board.cells.length; i++) {
      for (let j = 0; j < board.cells[i].length; j++) {
        if(board.cells[i][j].piece?.color === Colors.BLACK){
          botCells.push(board.cells[i][j])
        }
      }
    }
    return botCells;
  }
  function getCellsToMoveForBot(){
    let cellsToMoveForBot: Cell[] = [];
    for (let i = 0; i < board.cells.length; i++) {
      for (let j = 0; j < board.cells[i].length; j++) {
        cellsToMoveForBot.push(board.cells[i][j])
      }
    }
    return cellsToMoveForBot;
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  useEffect(() => {
    if (currentPlayer.color === Colors.BLACK) {
      botFunction();
    }
  }, [currentPlayer, botFunction])

  function botFunction(){
    let botCells: Cell[] = getBotCells();
    let cellsToMoveForBot: Cell[] = getCellsToMoveForBot();
    botCells.forEach(cell => {
      cellsToMoveForBot.forEach(cellToMove => {
        let randomCellToMove: Cell = board.getCell(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8));
        if(cell.piece?.canMove(randomCellToMove)){
          console.log("Bot makes click")
          click(cell);
          click(randomCellToMove);
          return false;
        }
        else{
          let elementToRemove = randomCellToMove;
          cellsToMoveForBot = cellsToMoveForBot.filter(cellToMove => cellToMove !== elementToRemove);
        }
      });
    });
  }


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

/*if(currentPlayer.color === Colors.BLACK){
      
    } */