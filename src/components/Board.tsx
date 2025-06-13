// src/Board.tsx
import React, { useRef, useState } from 'react'
import { isLegalMove, doMove } from '../chessRules'
import '../css/board.css'
import pawn   from '../assets/wp.png'
import rook   from '../assets/wr.png'
import knight from '../assets/wn.png'
import bishop from '../assets/wb.png'
import queen  from '../assets/wq.png'
import king   from '../assets/wk.png'
import type { Piece as ChessPiece, Board as ChessBoard } from '../chessRules'

const initialBoard: ChessBoard = [
  [
  { type: 'rook',   moved: false },
  { type: 'knight', moved: false },
  { type: 'bishop', moved: false },
  { type: 'queen',  moved: false },
  { type: 'king',   moved: false },
  { type: 'bishop', moved: false },
  { type: 'knight', moved: false },
  { type: 'rook',   moved: false }
  ],
  // rank 1: 8 pawns
  Array<ChessPiece | null>(8).fill({ type: 'pawn', moved: false }),

  // ranks 2–7: empty
  ...Array.from({ length: 6 }, () => Array<ChessPiece | null>(8).fill(null)),
]

export default function Board() {
  const [board, setBoard] = useState<ChessBoard>(initialBoard)
   const [hoverSquare, setHoverSquare] = useState<{ r: number, c: number }|null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLImageElement|null>(null)
  const dragStartRef = useRef<{ fromR: number, fromC: number }|null>(null)
  const [draggingFrom, setDraggingFrom] = useState<{ fromR: number, fromC: number }|null>(null)

  const imgOf = (p: ChessPiece) =>
    ({ pawn, rook, knight, bishop, queen, king }[p.type]!)

  function onPointerDown(
    e: React.PointerEvent<HTMLImageElement>,
    r: number,
    c: number
  ) {
    e.preventDefault()
    dragStartRef.current = { fromR: r, fromC: c }
    setDraggingFrom({ fromR: r, fromC: c })

    // spawn ghost image
    const img = e.currentTarget
    const ghost = img.cloneNode(true) as HTMLImageElement
    ghost.style.position    = 'absolute'
    ghost.style.pointerEvents = 'none'
    ghost.style.width       = `${img.clientWidth}px`
    ghost.style.height      = `${img.clientHeight}px`
    document.body.appendChild(ghost)
    ghost.style.left        = `${e.pageX - img.clientWidth/2}px`
    ghost.style.top         = `${e.pageY - img.clientHeight/2}px`
    ghostRef.current        = ghost

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup',   onPointerUp)

    img.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    const ghost = ghostRef.current
    const br    = boardRef.current
    if (!ghost || !br) return

    // move ghost
    ghost.style.left = `${e.pageX - ghost.clientWidth/2}px`
    ghost.style.top  = `${e.pageY - ghost.clientHeight/2}px`

    // compute which square we're over
    const rect = br.getBoundingClientRect()
    const size = rect.width / 8
    const cx = e.clientX - rect.left
    const cy = rect.bottom - e.clientY
    let c = Math.floor(cx / size)
    let r = Math.floor(cy / size)
    // only keep it if on-board
    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      setHoverSquare({ r, c })
    } else {
      setHoverSquare(null)
    }
  }

  function onPointerUp(e: PointerEvent) {
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup',   onPointerUp)

    const start = dragStartRef.current
    const ghost = ghostRef.current
    const br    = boardRef.current
    if (start && ghost && br) {
      const rect = br.getBoundingClientRect()
      const sq   = rect.width / 8
      const tc   = Math.floor((e.clientX - rect.left)  / sq)
      const tr   = Math.floor((rect.bottom - e.clientY) / sq)
      const { fromR: fr, fromC: fc } = start

      if (isLegalMove(board, fr, fc, tr, tc)) {
        setBoard(b => doMove(b, fr, fc, tr, tc))
      }
      document.body.removeChild(ghost)
    }

    // cleanup fade state & refs
    setDraggingFrom(null)
    dragStartRef.current = null
    ghostRef.current     = null

    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  return (
    <div className="border">
      <div ref={boardRef} className="board">
        {board
          .slice().reverse()
          .map((row, revR) =>
            row.map((piece, c) => {
              const r = 7 - revR
              const isHovered = hoverSquare?.r === r && hoverSquare?.c === c
              return (
                <div key={`${r}-${c}`} className={`square${isHovered ? ' hovered' : ''}`}>
                  {piece && (
                    <img
                      draggable={false}
                      src={imgOf(piece)}
                      onPointerDown={e => onPointerDown(e, r, c)}
                      className="piece"
                      style={{
                        opacity:
                          draggingFrom?.fromR === r
                          && draggingFrom?.fromC === c
                            ? 0.5
                            : 1
                      }}
                    />
                  )}
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}
