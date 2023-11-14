import React, {useState, useEffect} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import PawnPromotionComponent from './components/PawnPromotionComponent';
import BotInfoComponent from './components/BotInfoComponent';
import HistoryComponent from './components/HistoryComponent';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(whitePlayer);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<true | false>(false);
  useEffect( () => {
    restart();
    console.clear();
    setCurrentPlayer(whitePlayer);
  }, [])

  function restart(){
    const newBoard = new Board;
    newBoard.initCells();
    newBoard.addTestPieces();
    setBoard(newBoard);
  }

  function swapPlayer(){
    console.log(board.endGame);
    console.log(board.winner);
    console.log(board.reason);
    if(board.endGame){
      console.log("Game is ended");
      showPromotionDialog();
    }
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function showPromotionDialog(){
    setIsPromotionDialogOpen(true);
  }
  function closePromotionDialog(){
    setIsPromotionDialogOpen(false);
  }
  

  return (
    <div className="App">
      <HistoryComponent moves={board.blackMoves}/>
      <BotInfoComponent board={board} currentPlayer={currentPlayer}/>
      <PawnPromotionComponent isPromotionDialogOpen={isPromotionDialogOpen} setIsPromotionDialogOpen={setIsPromotionDialogOpen} closeDialog={closePromotionDialog}/>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
      <PlayerInfoComponent board={board} currentPlayer={currentPlayer}/>
      <HistoryComponent moves={board.whiteMoves}/>
    </div>
  );
}

export default App;
