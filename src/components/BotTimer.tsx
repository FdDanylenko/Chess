import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';
import { Board } from '../models/Board';

interface BotTimerProps{
  currentPlayer: Player | null;
  timeSet: number;
  board: Board
  swapPlayer: () => void;
}

const BotTimer: FC<BotTimerProps> = ({currentPlayer, timeSet, board, swapPlayer}) => {
  const [time, setTime] = useState(900);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  var seconds = Math.floor((time) % 60);
  var minutes = Math.floor((time / 60) % 60);
  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  useEffect(() => {
    restartTimer();
  }, [timeSet])
  
  useEffect(() => {
    if (board.endGame) {
      clearInterval(timer.current!);
    }
  }, [board.endGame]);

  function restartTimer(){
    setTime(900);
  }

  function startTimer(){
    if(timer.current){
      clearInterval(timer.current)
    }
    const callBack = currentPlayer?.color === Colors.BLACK ? decrementTimer : dontDecrementTimer;
    timer.current = setInterval(callBack, 1000);
  }

  function decrementTimer(){
    setTime((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        clearInterval(timer.current!);
        board.setWinner("White", "time run out");
        swapPlayer();
        return prev;
      }
    });
  }
  function dontDecrementTimer(){
  }

  return(
    <div className="timer"><p>{minutes}:{seconds < 10 ? <span>{'0' + seconds}</span> : <span>{seconds}</span>}</p></div>
  );
};

export default BotTimer;