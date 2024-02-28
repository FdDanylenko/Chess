import React, { FC } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import BotTimer from "./BotTimer";

interface PlayerInfoComponentProps{
  board: Board;
  currentPlayer: Player | null;
  timeSet: number;
  swapPlayer: () => void;
}

const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet, swapPlayer}) => {
  return(
    <div className="info-section">
          <div className="player-info">
            <div className="bot-icon"></div>
            <div className="sub-info-box">
              <div className="player-name">Black player</div>
              <LostPieces pieces={board.whiteLostPieces}/>
            </div>
          </div>
          <BotTimer currentPlayer={currentPlayer} timeSet={timeSet} board={board} swapPlayer={swapPlayer}/>
        </div>
  );
};

export default PlayerInfoComponent;