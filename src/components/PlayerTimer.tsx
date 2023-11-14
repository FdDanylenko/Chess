import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface PlayerTimerProps{
  currentPlayer: Player | null;
  timeSet: number;
}

const PlayerTimer: FC<PlayerTimerProps> = ({currentPlayer, timeSet}) => {
  const [time, setTime] = useState(timeSet);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  var seconds = Math.floor((time) % 60);
  var minutes = Math.floor((time / 60) % 60);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])
  
  useEffect(() => {
    restartTimer();
  }, [timeSet])
  
  function restartTimer(){
    setTime(900);
  }

  function startTimer(){
    if(timer.current){
      clearInterval(timer.current)
    }
    const callBack = currentPlayer?.color === Colors.WHITE ? decrementTimer : dontDecrementTimer;
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

export default PlayerTimer;