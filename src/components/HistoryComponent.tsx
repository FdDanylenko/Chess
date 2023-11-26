import React, { FC } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  return(
    <div className="history-box">
      {moves.map((move, index) =>
          <div className="history-box-item" key={index}>
            &nbsp;{move}&nbsp;
          </div>
        )}
    </div>
  )
}

export default HistoryComponent;