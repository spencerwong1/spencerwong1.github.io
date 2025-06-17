export type PieceType = 
'pawn' |
'rook' |
'knight'|
'bishop'|
'queen' |
'king' |
'ezmail' |
'dropfinder'|
'github'|
'linkedin'|
'profile'|
'cryptoKraker';

export type Piece = {
  type: PieceType;
  moved: boolean;
  color: 'white' | 'black';
};
export type Board = (Piece | null)[][];

// helper: clone board deeply
function cloneBoard(board: Board): Board {
  return board.map(row => row.map(p => (p ? { ...p } : null)));
}

export function doMove(
  board: Board,
  fr: number, fc: number,
  tr: number, tc: number
): Board {
  const b2 = cloneBoard(board);
  const piece = b2[fr][fc]!;
  b2[fr][fc] = null;

  // Castling?
  if (piece.type === 'king' && fr === tr && Math.abs(tc - fc) === 2) {
    const dir = tc > fc ? +1 : -1;
    piece.moved = true;
    b2[tr][tc] = piece;

    const rookC = dir > 0 ? 7 : 0;
    const newRookC = tc - dir;
    const rook = b2[fr][rookC]!;
    b2[fr][rookC] = null;
    rook.moved = true;
    b2[fr][newRookC] = rook;

  } else {
    if (piece.type === 'pawn' && tr === 7) {
      b2[tr][tc] = { type: 'queen', moved: true, color: piece.color };
    } else {
      piece.moved = true;
      b2[tr][tc] = piece;
    }
  }
  return b2;
}

// onBoard helper
function onBoard(r: number, c: number) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

/**
 * Determine if a move from (fr,fc) to (tr,tc) is legal.
 * Only allows captures of opposing ('black') pieces; pawns capture diagonally.
 */
export function isLegalMove(
  board: Board,
  fr: number, fc: number,
  tr: number, tc: number
): boolean {
  if (!onBoard(fr, fc) || !onBoard(tr, tc)) return false;
  if (fr === tr && fc === tc) return false;

  const piece = board[fr][fc];
  if (!piece) return false;

  const dest = board[tr][tc];
  // Cannot capture own pieces or non-black pieces
  if (dest && dest.color !== 'black') return false;

  const dr = tr - fr, dc = tc - fc;
  const ady = Math.abs(dr), adx = Math.abs(dc);

  switch (piece.type) {
    case 'pawn':
      // forward move by 1
      if (dr === 1 && dc === 0 && !dest) return true;
      // two-step from starting rank
      if (fr === 1 && dr === 2 && dc === 0 && !dest && !board[fr + 1][fc]) return true;
      // diagonal capture
      if (dr === 1 && adx === 1 && dest && dest.color === 'black') return true;
      return false;

    case 'rook':
      if (fr === tr || fc === tc) {
        const stepR = fr === tr ? 0 : dr / ady;
        const stepC = fc === tc ? 0 : dc / adx;
        for (let r = fr + stepR, c = fc + stepC; r !== tr || c !== tc; r += stepR, c += stepC) {
          if (board[r][c]) return false;
        }
        return true;
      }
      return false;

    case 'bishop':
      if (ady === adx) {
        const stepR = dr / ady, stepC = dc / adx;
        for (let r = fr + stepR, c = fc + stepC; r !== tr && c !== tc; r += stepR, c += stepC) {
          if (board[r][c]) return false;
        }
        return true;
      }
      return false;

    case 'knight':
      if ((ady === 2 && adx === 1) || (ady === 1 && adx === 2)) return true;
      return false;

    case 'queen':
      // rook-like
      if (fr === tr || fc === tc) {
        const stepR = fr === tr ? 0 : dr / ady;
        const stepC = fc === tc ? 0 : dc / adx;
        for (let r = fr + stepR, c = fc + stepC; r !== tr || c !== tc; r += stepR, c += stepC) {
          if (board[r][c]) return false;
        }
        return true;
      }
      // bishop-like
      if (ady === adx) {
        const stepR = dr / ady, stepC = dc / adx;
        for (let r = fr + stepR, c = fc + stepC; r !== tr && c !== tc; r += stepR, c += stepC) {
          if (board[r][c]) return false;
        }
        return true;
      }
      return false;

    case 'king':
      // one-step
      if (ady <= 1 && adx <= 1 && (!dest || dest.color === 'black')) return true;
      // castling
      if (!piece.moved && fr === 0 && fc === 4 && dr === 0 && adx === 2) {
        // kingside
        if (tc === 6) {
          const rook = board[0][7];
          if (
            rook?.type === 'rook' &&
            !rook.moved &&
            !board[0][5] && !board[0][6]
          ) return true;
        }
        // queenside
        if (tc === 2) {
          const rook = board[0][0];
          if (
            rook?.type === 'rook' &&
            !rook.moved &&
            !board[0][1] && !board[0][2] && !board[0][3]
          ) return true;
        }
      }
      return false;

    default:
      return false;
  }
}

export interface Placement {
  row: number;
  col: number;
  piece: Piece;
}

export function addPiecesToBoard(
  board: Board,
  placements: Placement[]
): Board {
  const b2 = cloneBoard(board);
  for (const { row, col, piece } of placements) {
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      console.warn(`Skipping invalid placement at [${row},${col}]`);
      continue;
    }
    b2[row][col] = { ...piece };
  }
  return b2;
}
