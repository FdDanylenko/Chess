import React, {useState, useEffect} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import PawnPromotionComponent from './components/PawnPromotionComponent';
import AppContext from './models/AppContext';
import BotInfoComponent from './components/BotInfoComponent';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<true | false>(false)
  useEffect( () => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  function restart(){
    const newBoard = new Board;
    newBoard.initCells();
    newBoard.addPieces();
    setBoard(newBoard);
  }

  function swapPlayer(){
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
      <BotInfoComponent board={board} currentPlayer={currentPlayer}/>
      <PawnPromotionComponent isPromotionDialogOpen={isPromotionDialogOpen} setIsPromotionDialogOpen={setIsPromotionDialogOpen} closeDialog={closePromotionDialog}/>
      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
      <PlayerInfoComponent board={board} currentPlayer={currentPlayer}/>
    </div>
  );
}

export default App;
