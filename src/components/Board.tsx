import React, { useRef, useState, useMemo, useEffect } from 'react'
import { isLegalMove, doMove, addPiecesToBoard } from '../chessRules'
import '../css/board.css'
import type { 
  Piece as Piece,
  Board as ChessBoard,
  Placement
} from '../chessRules'

// png imports 
import pawn   from '../assets/wp.png'
import rook   from '../assets/wr.png'
import knight from '../assets/wn.png'
import bishop from '../assets/wb.png'
import queen  from '../assets/wq.png'
import king   from '../assets/wk.png'
import ezmail from '../assets/ezmail.png';
import dropfinder from '../assets/dropfinder1.png';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import profile from '../assets/black-king.png';
import cryptoKraker from '../assets/Cryptokraker.png';
import chess from '../assets/chess.png';
import arrow from '../assets/arrow.png';

import { CapturedCard } from './CapturedCard';

const initialBoard: ChessBoard = [
  [
  { type: 'rook',   moved: false, color: 'white' },
  { type: 'knight', moved: false, color: 'white'},
  { type: 'bishop', moved: false, color: 'white' },
  { type: 'queen',  moved: false, color: 'white' },
  { type: 'king',   moved: false, color: 'white' },
  { type: 'bishop', moved: false, color: 'white' },
  { type: 'knight', moved: false, color: 'white' },
  { type: 'rook',   moved: false, color: 'white' }
  ],
  // rank 1: 8 pawns
  Array<Piece | null>(8).fill({ type: 'pawn', moved: false, color: 'white' }),

  // ranks 2–7: empty
  ...Array.from({ length: 6 }, () => Array<Piece | null>(8).fill(null)),
]

const customPlacements: Placement[] = [
  { row: 6, col: 3, piece: { type: 'dropfinder', moved: false, color: 'black' } },
  { row: 5, col: 5, piece: { type: 'ezmail', moved: false, color: 'black' } },
  { row: 7, col: 6, piece: { type: 'github', moved: false, color: 'black' } },
  { row: 6, col: 1, piece: { type: 'linkedin', moved: false, color: 'black' } },
  { row: 4, col: 2, piece: { type: 'profile', moved: false, color: 'black' } },
  { row: 4, col: 7, piece: { type: 'cryptoKraker', moved: false, color: 'black' } },
  { row: 2, col: 4, piece: { type: 'chess', moved: false, color: 'black' } },
];

export default function Board() {
  const [board, setBoard] = useState<ChessBoard>(
    () => addPiecesToBoard(initialBoard, customPlacements)
  );
  const [hoverSquare, setHoverSquare] = useState<{ r: number, c: number }|null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLImageElement|null>(null)
  const dragStartRef = useRef<{ fromR: number, fromC: number }|null>(null)
  const [progress, setProgress] = useState(0);
  const [blackPieces, setBlackPieces] = useState(7);
  const [capturedPiece, setCapturedPiece] = useState<Piece | null>(null);
  const [dragging, setDragging] = useState<{ r: number, c: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    // after 2s of max delay + 0.5s anim, remove the class
    const totalMs = (2 + 0.5) * 1000;
    const id = setTimeout(() => setInitial(false), totalMs);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setProgress(50), 100);
    return () => clearTimeout(t);
  }, []);

  
  // Precompute random delays (0–2s) for each square once
  const delays = useMemo(
  () =>
    Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => Math.random() * 2)  // 0–2 seconds
    ),
  []
);

  const imgOf = (p: Piece) =>
    ({ pawn, rook, knight, bishop, queen, king, ezmail, dropfinder, github, linkedin, profile, cryptoKraker, chess}[p.type]!)

  // Open websites upon github or linkedin
  function handleCapture(target: Piece) {
    if (target.color == 'black') {
      setProgress(p => p + 50/7);
      setBlackPieces(n => n - 1);
      setCapturedPiece(target);
    }
  }

  function onPointerDown(
    e: React.PointerEvent<HTMLImageElement>,
    r: number,
    c: number
  ) {
    e.preventDefault()
    dragStartRef.current = { fromR: r, fromC: c }

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

    dragStartRef.current = { fromR: r, fromC: c };
    setDragging({ r, c }); // set dragging state


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

      const target = board[tr][tc]
      if (isLegalMove(board, fr, fc, tr, tc)) {
        setHasMoved(true);

        if (target && ['ezmail','dropfinder','github','linkedin','profile','cryptoKraker', 'chess'].includes(target.type)) {
          handleCapture(target)
        }
        setBoard(b => doMove(b, fr, fc, tr, tc))
      }

      document.body.removeChild(ghost)
    }

    // cleanup fade state & refs

    dragStartRef.current = null;
    ghostRef.current = null;
    setDragging(null); // reset dragging


    dragStartRef.current = null
    ghostRef.current     = null

    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  return (
    <div
      className={
        `board-wrapper${initial ? ' initial' : ''}` +
        (capturedPiece?.color === 'black' ? ' shifted' : '')
      }
    >
      {/* Progress bar container */}
      <div className='board-progress-container'>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ height: `${progress}%` }}
          />
          <div className="progress-label">
            {blackPieces !== 0 ? `M${blackPieces}` : '1-0'}
          </div>
        </div>

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
                          className={`piece${dragging?.r === r && dragging?.c === c ? ' faded' : ''}`}
                          style={{
                            /* just set the per-square delay */
                            '--delay': `${delays[r][c]}s`
                          } as React.CSSProperties}
                        />
                      )}
                    </div>
                  )
                })
              )
            }
            {!hasMoved && <img className="arrow" src={arrow} alt="First move hint" />}
          </div>
        </div>
      </div>  
      {capturedPiece && <CapturedCard piece={capturedPiece} />}
    </div>
  )
}
