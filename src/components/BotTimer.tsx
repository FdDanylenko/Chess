import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface BotTimerProps{
  currentPlayer: Player | null;
}

const BotTimer: FC<BotTimerProps> = ({currentPlayer}) => {
  const [time, setTime] = useState(900);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  var seconds = Math.floor((time) % 60);
  var minutes = Math.floor((time / 60) % 60);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  function startTimer(){
    if(timer.current){
      clearInterval(timer.current)
    }
    const callBack = currentPlayer?.color === Colors.BLACK ? decrementTimer : dontDecrementTimer;
    timer.current = setInterval(callBack, 1000);
  }

  function decrementTimer(){
    setTime(prev => prev-1);
  }
  function dontDecrementTimer(){
  }

  return(
    <div className="timer"><p>{minutes}:{seconds < 10 ? <span>{'0' + seconds}</span> : <span>{seconds}</span>}</p></div>
  );
};

export default BotTimer;