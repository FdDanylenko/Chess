import React, {useState, useEffect} from 'react';
import BoardComponent from './components/BoardComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import PawnPromotionComponent from './components/PawnPromotionComponent';
import BotInfoComponent from './components/BotInfoComponent';
import HistoryComponent from './components/HistoryComponent';
import GameResult from './components/GameResult';
import BoardTestingInfo from './components/BoardTestingInfo';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);
  const [timeSet, setTimeSet] = useState<number>(900)
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<true | false>(false);
  const [isGameResultDialogOpen, setIsGameResultDialogOpen] = useState<true | false>(false);
  useEffect( () => {
    restart();
    console.clear();
    setCurrentPlayer(whitePlayer);
    setTimeSet(timeSet);
  }, [])

  function restart(){
    const newBoard = new Board;
    newBoard.initCells();
    newBoard.addPieces();
    setBoard(newBoard);
    setTimeSet(Math.random);
  }

  function swapPlayer(){
    if(board.endGame){
      showGameResultDialog();
    }
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function showPromotionDialog(){
    setIsPromotionDialogOpen(true);
  }
  function closePromotionDialog(){
    setIsPromotionDialogOpen(false);
  }
  function showGameResultDialog(){
    setIsGameResultDialogOpen(true);
  }
  function closeGameResultDialog(){
    setIsGameResultDialogOpen(false);
  }

  return (
    <div className="App">
      <HistoryComponent moves={board.blackMoves}/>
      <BotInfoComponent board={board} currentPlayer={currentPlayer} timeSet={timeSet} swapPlayer={swapPlayer}/>
      <PawnPromotionComponent isPromotionDialogOpen={isPromotionDialogOpen} setIsPromotionDialogOpen={setIsPromotionDialogOpen} closeDialog={closePromotionDialog}/>
      <GameResult isGameResultDialogOpen={isGameResultDialogOpen} setIsGameResultDialogOpen={setIsGameResultDialogOpen} closeDialog={closeGameResultDialog} winner={board.winner} reason={board.reason} restart={restart} setCurrentPlayer={setCurrentPlayer} whitePlayer={whitePlayer} setTimeSet={setTimeSet}/>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
      <PlayerInfoComponent board={board} currentPlayer={currentPlayer} timeSet={timeSet} swapPlayer={swapPlayer}/>
      <HistoryComponent moves={board.whiteMoves}/>
    </div>
  );
}

export default App;
