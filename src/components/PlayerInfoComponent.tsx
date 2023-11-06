import React from "react";

const PlayerInfoComponent = () => {
  return(
    <div className="info-section">
          <div className="player-info">
            <div className="player-icon"></div>
            <div>
              <div className="player-name">Player</div>
            </div>
          </div>
          <div className="timer"><span>09:13</span></div>
        </div>
  );
};

export default PlayerInfoComponent;