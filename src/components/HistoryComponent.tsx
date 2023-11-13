import React, { FC } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  return(
    <div className="history-box">
      {moves.map((move, index) =>
          <div key={index}>
            {move},&nbsp;
          </div>
        )}
    </div>
  )
}

export default HistoryComponent;