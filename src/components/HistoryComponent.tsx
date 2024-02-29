import React, { FC, useEffect, useRef, useLayoutEffect } from "react";

interface HistoryComponentProps{
  moves: String[];
}

const HistoryComponent:FC<HistoryComponentProps> = ({moves}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToLastElement = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToLastElement();
  }, []);

  return(
    <div className="history-box">
      {moves.map((move, index) =>
          <div className="history-box-item" key={index} ref={index === moves.length - 1 ? ref : null}>
            &nbsp;{move}&nbsp;
          </div>
        )}
    </div>
  )
}

export default HistoryComponent;