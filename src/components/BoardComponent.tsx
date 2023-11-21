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
  // function getBotCells(){
  //   let botCells: Cell[] = [];
  //   for (let i = 0; i < board.cells.length; i++) {
  //     for (let j = 0; j < board.cells[i].length; j++) {
  //       if(board.cells[i][j].piece?.color === Colors.BLACK){
  //         botCells.push(board.cells[i][j])
  //       }
  //     }
  //   }
  //   return botCells;
  // }
  // function getCellsToMoveForBot(){
  //   let cellsToMoveForBot: Cell[] = [];
  //   for (let i = 0; i < board.cells.length; i++) {
  //     for (let j = 0; j < board.cells[i].length; j++) {
  //       cellsToMoveForBot.push(board.cells[i][j])
  //     }
  //   }
  //   return cellsToMoveForBot;
  // }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  useEffect(() => {
    // if (currentPlayer.color === Colors.BLACK) {
    //   setTimeout(()=>{
    //     botFunction();
    //   }, 1000)
    // }
  }, [currentPlayer]);


  // function botFunction(){
  //   let botCells: Cell[] = getBotCells();
  //   console.log();
  //   console.log("Trying to make a good move");
  //   let isThereAGoodTarget = findMove(1);
  //   if(isThereAGoodTarget){
  //     return;
  //   }
  //   console.log("Trying to make a normal move");
  //   let isThereANormalTarget = findMove(2);
  //   if(isThereANormalTarget){
  //     return;
  //   }
  //   console.log("Trying to make a move");
  //   let isThereAMove = findMove(3);
  //   if(isThereAMove){
  //     return;
  //   }
  //   let myKing: Cell | void = board.findKing(board, currentPlayer.color);
  //   ((myKing as Cell).piece as King).isCheckMate = true;
  //   return;
  // }
  // function tryToMakeGoodMove(randomCell: Cell){
  //   let moveMade = false;
  //   let runOutOfCells = false
  //   let cellsToMoveForBot: Cell[] = getCellsToMoveForBot();
  //   console.log("+")
  //   do {
  //     cellsToMoveForBot.forEach(cellToMove => {
  //       let randomCellToMove: Cell = cellsToMoveForBot[Math.floor(Math.random() * cellsToMoveForBot.length)];
  //       if(randomCell.piece && randomCell.piece?.canMove(randomCellToMove) && randomCellToMove.piece && randomCellToMove.piece.strength > randomCell.piece.strength){
  //         click(randomCell);
  //         highlightCells();
  //         click(randomCellToMove);
  //         moveMade = true;
  //       }
  //       else{
  //         let elementToRemove = randomCellToMove;
  //         cellsToMoveForBot = cellsToMoveForBot.filter(cellToMove => cellToMove !== elementToRemove);
  //       }
  //     });
  //     if(cellsToMoveForBot.length === 0){
  //       runOutOfCells = true
  //     }
  //   } while (cellsToMoveForBot.length > 0 && !moveMade && !runOutOfCells);
  //   if (moveMade){
  //     console.log("Made a good move");
  //     return true;
  //   };
  //   return false;
  // }
  // function tryToMakeNormalMove(randomCell: Cell){
  //   let moveMade = false;
  //   let cellsToMoveForBot: Cell[] = getCellsToMoveForBot();
  //   do {
  //     cellsToMoveForBot.forEach(cellToMove => {
  //       let randomCellToMove: Cell = cellsToMoveForBot[Math.floor(Math.random() * cellsToMoveForBot.length)];
  //       if(randomCell.piece?.canMove(randomCellToMove) && randomCellToMove.piece && randomCellToMove.piece.strength === randomCell.piece.strength){
  //         click(randomCell);
  //         highlightCells();
  //         click(randomCellToMove);
  //         moveMade = true;
  //       }
  //       else{
  //         let elementToRemove = randomCellToMove;
  //         cellsToMoveForBot = cellsToMoveForBot.filter(cellToMove => cellToMove !== elementToRemove);
  //       }
  //       if(cellsToMoveForBot.length === 0){
  //         return false;
  //       }
  //     });
  //   } while (cellsToMoveForBot.length > 0 && !moveMade);
  //   if (moveMade){
  //     console.log("Made a normal move");
  //     return true;
  //   };
  //   return false;
  // }
  // function tryToMakeMove(randomCell: Cell){
  //   let moveMade = false;
  //   let cellsToMoveForBot: Cell[] = getCellsToMoveForBot();
  //   do {
  //     cellsToMoveForBot.forEach(cellToMove => {
  //       let randomCellToMove: Cell = cellsToMoveForBot[Math.floor(Math.random() * cellsToMoveForBot.length)];
  //       if(randomCell.piece?.canMove(randomCellToMove)){
  //         click(randomCell);
  //         click(randomCellToMove);
  //         moveMade = true;
  //       }
  //       else{
  //         let elementToRemove = randomCellToMove;
  //         cellsToMoveForBot = cellsToMoveForBot.filter(cellToMove => cellToMove !== elementToRemove);
  //       }
  //       if(cellsToMoveForBot.length === 0){
  //         return false;
  //       }
  //     });
  //   } while (cellsToMoveForBot.length > 0 && !moveMade);
  //   if (moveMade) return true;
  //   return false;
  // }
  // function findMove(index: number){
  //   let botCells: Cell[] = getBotCells();
  //   let moveMade = false;
  //   let tryToMovePiece: boolean = false;
  //   do {
  //     do {
  //       let randomCell: Cell = botCells[Math.floor(Math.random() * botCells.length)];
  //       if(randomCell.piece?.canPieceMove){
  //         if(index === 1) tryToMovePiece = tryToMakeGoodMove(randomCell);
  //         if(index === 2) tryToMovePiece = tryToMakeNormalMove(randomCell);
  //         if(index === 3) tryToMovePiece = tryToMakeMove(randomCell);
  //         if(tryToMovePiece){
  //           moveMade = true;
  //         }
  //         else{
  //           let elementToRemove = randomCell;
  //           botCells = botCells.filter(cell => cell !== elementToRemove);
  //           console.log(botCells.length);
  //         }
  //       }
  //       else{
  //         let elementToRemove = randomCell;
  //         botCells = botCells.filter(cell => cell !== elementToRemove);
  //         console.log(botCells.length);
  //       }
  //     } while (botCells.length > 0 && !moveMade);
  //     if(botCells.length === 0 && !moveMade){
  //       return false;
  //     }
  //   } while (!moveMade);
  //   if(moveMade){
  //     return true;
  //   }
  //   return false;
  // }

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