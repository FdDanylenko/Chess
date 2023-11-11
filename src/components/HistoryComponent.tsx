import React, { FC } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  return(
    <div className="history-box">
      {moves.map(move =>
          <div>
            {move},&nbsp;
          </div>
        )}
    </div>
  )
}

export default HistoryComponent;