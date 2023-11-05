import React, {useState, useEffect} from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import PlayerInfoComponent from './components/PlayerInfoComponent';
import { Board } from './models/Board';

function App() {
  const [board, setBoard] = useState(new Board());

  useEffect( () => {
    restart();
  }, [])

  function restart(){
    const newBoard = new Board;
    newBoard.initCells();
    newBoard.addPieces();
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <PlayerInfoComponent />
      <BoardComponent board={board} setBoard={setBoard} />
      <PlayerInfoComponent />
    </div>
  );
}

export default App;
