import React, { FC } from 'react';
import { Piece } from '../models/pieces/Piece';
import { PieceNames } from '../models/pieces/types';

interface LostPiecesProps{
  pieces: Piece[];
}

const LostPieces: FC<LostPiecesProps> = ({pieces}) => {
  return(
    <div className='lost-pieces'>
      <div className='pawns-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Pawn" && <img alt='Piece item' src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='bishops-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Bishop" && <img alt='Piece item' src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='knights-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Knight" && <img alt='Piece item' src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='rooks-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Rook" && <img alt='Piece item' src={piece.logo}/>}
          </div>
        )}
      </div>
      <div className='queen-box pieces-box'>
        {pieces.map(piece =>
          <div key={piece.id}>
            {piece.logo && piece.name === "Queen" && <img alt='Piece item' src={piece.logo}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPieces;