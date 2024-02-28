import React, { FC } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface GameResultProps{
  isGameResultDialogOpen: boolean;
  setIsGameResultDialogOpen: (isGameResultDialogOpen: boolean) => void;
  closeDialog: () => void;
  restart: () => void;
  setCurrentPlayer: (currentPlayer: Player) => void;
  whitePlayer: Player;
  winner: string;
  reason: string;
  setTimeSet: (number: number) => void;
}

const GameResult: FC<GameResultProps> = ({isGameResultDialogOpen, setIsGameResultDialogOpen, closeDialog, winner, reason, restart, setCurrentPlayer, whitePlayer, setTimeSet}) => {
  function openDialog(){
    setIsGameResultDialogOpen(true);
  }

  closeDialog = () => {
    setIsGameResultDialogOpen(false);
    restartGame();
  }

  function restartGame(){
    restart();
    console.clear();
    setCurrentPlayer(whitePlayer);
    setTimeSet(Math.random());
  }
  if (!isGameResultDialogOpen) {
    return null;
  }else{
    return(
      <div className="game-result-window">
        <div className="game-result__decoration"></div>
        <div className="titles-box">
          <div className="game-result__title">{winner !== "Draw" ? (winner === Colors.WHITE ? "White won" : "Black won") : "Draw"}</div>
          <div className="game-result__subtitle">by {reason}</div>
        </div>
        <div className="players-box">
          <div className="white-player">
            <div className="game-result__player-icon"></div>
            <div className="game-result__player-name">White player</div>
          </div>
          <span className="vs-text">vs</span>
          <div className="black-player">
            <div className="game-result__player-icon bot"></div>
            <div className="game-result__player-name">Black player</div>
          </div>
        </div>
        <div className="buttons-box">
          <button className="rematch-button" onClick={() => closeDialog()}>New game</button>
        </div>
      </div>
    );
  }
};

export default GameResult;