import React from "react";

const PlayerInfoComponent = () => {
  return(
    <div className="info-section">
          <div className="player-info">
            <div className="bot-icon"></div>
            <div>
              <div className="player-name">Bot</div>
            </div>
          </div>
          <div className="bot-timer timer"><span>09:13</span></div>
        </div>
  );
};

export default PlayerInfoComponent;