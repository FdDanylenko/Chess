import React, { FC, useEffect, useRef } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addAndScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  };

  useEffect(() => {
    addAndScroll();
  }, [moves]);

  return(
    <div ref={containerRef} className="history-box">
      {moves.map((move, index) =>
          <div className="history-box-item" key={index}>
            &nbsp;{move}&nbsp;
          </div>
        )}
    </div>
  )
}

export default HistoryComponent;