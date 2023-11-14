import React, { FC } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import PlayerTimer from "./PlayerTimer";
import { Player } from "../models/Player";

interface PlayerInfoComponentProps{
  board: Board;
  currentPlayer: Player | null;
  timeSet: number;
}

const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer, timeSet}) => {
  return(
    <div className="info-section">
          <div className="player-info">
            <div className="player-icon"></div>
            <div className="sub-info-box">
              <div className="player-name">You</div>
              <LostPieces pieces={board.blackLostPieces}/>
            </div>
          </div>
          <PlayerTimer currentPlayer={currentPlayer} timeSet={timeSet}/>
        </div>
  );
};

export default PlayerInfoComponent;