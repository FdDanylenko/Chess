import React, { FC } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  // function updateScroll(){
  //   var element = document.getElementById("history-box");
  //   if(element !== null){
  //     element.scrollLeft = 1900;
  //   }
  // }
  //moves = ["fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth", "fdf", "erhrtj", "Ehrth"]
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