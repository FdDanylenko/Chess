import React, { FC } from 'react';
import { Piece } from '../models/pieces/Piece';
import { PiecesNames } from '../models/pieces/PiecesNames';

interface LostPiecesProps{
  pieces: Piece[];
}

const LostPieces: FC<LostPiecesProps> = ({pieces}) => {
  return(
    <div className='lost-pieces'>
      <div className='pawns-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Pawn" && <img src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='bishops-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Bishop" && <img src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='knights-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Knight" && <img src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='rooks-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Rook" && <img src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='queen-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Queen" && <img src={piece.logo}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPieces;