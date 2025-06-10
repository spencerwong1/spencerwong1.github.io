import React, { useState } from 'react'
import '../css/board.css'
import pawn from '../assets/wp.png'
import rook from '../assets/wr.png'
import knight from '../assets/wn.png'
import bishop from '../assets/wb.png'
import queen from '../assets/wq.png'
import king from '../assets/wk.png'

type Piece = {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
}

// Only white pieces: major on rank 0, pawns on rank 1
const initialBoard: (Piece | null)[][] = [
  [
    { type: 'rook'},
    { type: 'knight'},
    { type: 'bishop'},
    { type: 'queen'},
    { type: 'king'},
    { type: 'bishop'},
    { type: 'knight'},
    { type: 'rook'}
  ],
  Array(8).fill({ type: 'pawn'}),
  ...Array(6).fill(Array(8).fill(null))
]

export default function Board() {
  const [board] = useState(initialBoard)

  const getPieceImg = (piece: Piece | null) => {
    if (!piece) return null
    switch (piece.type) {
      case 'pawn':   return pawn
      case 'rook':   return rook
      case 'knight': return knight
      case 'bishop': return bishop
      case 'queen':  return queen
      case 'king':   return king
    }
  }

  console.log(initialBoard);

  return (
    <div className="border">
      <div className="board">
        {board
          .slice()
          .reverse()
          .map((row, rIndex) =>
            row.map((piece, cIndex) => (
              <div
                key={`${7 - rIndex}-${cIndex}`}
                className="square"
              >
                {piece && (
                  <img
                    src={getPieceImg(piece)!}
                    className="piece"
                    draggable={true}
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', '')    // triggers the drag
                      document.body.style.cursor = 'grabbing'      // change cursor
                    }}
                    onDragEnd={() => {
                      document.body.style.cursor = 'auto'
                    }}
                  />
                )}
              </div>
            ))
          )}
      </div>
    </div>
  )
}