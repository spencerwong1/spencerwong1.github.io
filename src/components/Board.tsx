import React, { useRef, useState } from 'react'
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

// Bottom-up initial board: major pieces on rank 0, pawns on rank 1
const initialBoard: (Piece | null)[][] = [
  [
    { type: 'rook' },
    { type: 'knight' },
    { type: 'bishop' },
    { type: 'queen' },
    { type: 'king' },
    { type: 'bishop' },
    { type: 'knight' },
    { type: 'rook' }
  ],
  Array(8).fill({ type: 'pawn' }),
  ...Array(6).fill(Array(8).fill(null))
]

export default function Board() {
  const [board, setBoard] = useState(initialBoard)
  const boardRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLImageElement|null>(null)
  const dragStartRef = useRef<{ fromR: number, fromC: number }|null>(null)

  const getPieceImg = (piece: Piece) => {
    switch (piece.type) {
      case 'pawn':   return pawn
      case 'rook':   return rook
      case 'knight': return knight
      case 'bishop': return bishop
      case 'queen':  return queen
      case 'king':   return king
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLImageElement>, r: number, c: number) {
    e.preventDefault()
    const img = e.currentTarget
    dragStartRef.current = { fromR: r, fromC: c }

    // spawn ghost
    const ghost = img.cloneNode(true) as HTMLImageElement
    ghost.style.position = 'absolute'
    ghost.style.pointerEvents = 'none'
    ghost.style.width = `${img.clientWidth}px`
    ghost.style.height = `${img.clientHeight}px`
    document.body.appendChild(ghost)
     // set its initial position so it doesn't sit at 0,0
    ghost.style.left = `${e.pageX - img.clientWidth/2}px`
    ghost.style.top  = `${e.pageY - img.clientHeight/2}px`
    ghostRef.current = ghost

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup',   onPointerUp)

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    if (!ghostRef.current) return
    ghostRef.current.style.left = `${e.pageX - ghostRef.current.clientWidth/2}px`
    ghostRef.current.style.top  = `${e.pageY - ghostRef.current.clientHeight/2}px`
  }

  function onPointerUp(e: PointerEvent) {
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup',   onPointerUp)

    const dragStart = dragStartRef.current
    const ghost     = ghostRef.current
    const boardEl   = boardRef.current
    if (!dragStart || !ghost || !boardEl) return

    // get board geometry
    const rect   = boardEl.getBoundingClientRect()
    const sqSize = rect.width / 8

    // compute target file & rank
    const col = Math.floor((e.clientX - rect.left) / sqSize)
    const row = Math.floor((rect.bottom - e.clientY) / sqSize)

    // only update if drop is on-board
    if (col >= 0 && col < 8 && row >= 0 && row < 8) {
      setBoard(b => {
        const copy = b.map(r => r.slice())
        copy[row][col] = copy[dragStart.fromR][dragStart.fromC]
        copy[dragStart.fromR][dragStart.fromC] = null
        return copy
      })
    }

    // clean up ghost in any case
    document.body.removeChild(ghost)
    ghostRef.current = null
    dragStartRef.current = null
  }

  return (
    <div className="border">
      <div ref={boardRef} className="board">
        {board
          .slice().reverse()            // bottom-up
          .map((row, revR) =>
            row.map((piece, c) => {
              const r = 7 - revR   // map back to original row index
              return (
                <div key={`${r}-${c}`} className="square">
                  {piece && (
                    <img
                      src={getPieceImg(piece)}
                      draggable={false}           // disable native drag
                      onPointerDown={e => onPointerDown(e, r, c)}
                      className="piece"
                    />
                  )}
                </div>
              )
            })
          )}
      </div>
    </div>
  )
}
