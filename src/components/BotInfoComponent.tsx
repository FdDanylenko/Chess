import React, { FC } from "react";
import LostPieces from "./LostPieces";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import BotTimer from "./BotTimer";

interface PlayerInfoComponentProps{
  board: Board;
  currentPlayer: Player | null;
}

const PlayerInfoComponent: FC<PlayerInfoComponentProps> = ({board, currentPlayer}) => {
  return(
    <div className="info-section">
          <div className="player-info">
            <div className="bot-icon"></div>
            <div className="sub-info-box">
              <div className="player-name">Bot</div>
              <LostPieces pieces={board.whiteLostPieces}/>
            </div>
          </div>
          <BotTimer currentPlayer={currentPlayer}/>
        </div>
  );
};

export default PlayerInfoComponent;