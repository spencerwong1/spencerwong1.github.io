"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doMove = doMove;
exports.isLegalMove = isLegalMove;
exports.addPiecesToBoard = addPiecesToBoard;
// helper: clone board deeply
function cloneBoard(board) {
    return board.map(function (row) { return row.map(function (p) { return (p ? __assign({}, p) : null); }); });
}
function doMove(board, fr, fc, tr, tc) {
    var b2 = cloneBoard(board);
    var piece = b2[fr][fc];
    b2[fr][fc] = null;
    // Castling?
    if (piece.type === 'king' && fr === tr && Math.abs(tc - fc) === 2) {
        var dir = tc > fc ? +1 : -1;
        piece.moved = true;
        b2[tr][tc] = piece;
        var rookC = dir > 0 ? 7 : 0;
        var newRookC = tc - dir;
        var rook = b2[fr][rookC];
        b2[fr][rookC] = null;
        rook.moved = true;
        b2[fr][newRookC] = rook;
    }
    else {
        if (piece.type === 'pawn' && tr === 7) {
            b2[tr][tc] = { type: 'queen', moved: true, color: piece.color };
        }
        else {
            piece.moved = true;
            b2[tr][tc] = piece;
        }
    }
    return b2;
}
// onBoard helper
function onBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}
/**
 * Determine if a move from (fr,fc) to (tr,tc) is legal.
 * Only allows captures of opposing ('black') pieces; pawns capture diagonally.
 */
function isLegalMove(board, fr, fc, tr, tc) {
    if (!onBoard(fr, fc) || !onBoard(tr, tc))
        return false;
    if (fr === tr && fc === tc)
        return false;
    var piece = board[fr][fc];
    if (!piece)
        return false;
    var dest = board[tr][tc];
    // Cannot capture own pieces or non-black pieces
    if (dest && dest.color !== 'black')
        return false;
    var dr = tr - fr, dc = tc - fc;
    var ady = Math.abs(dr), adx = Math.abs(dc);
    switch (piece.type) {
        case 'pawn':
            // forward move by 1
            if (dr === 1 && dc === 0 && !dest)
                return true;
            // two-step from starting rank
            if (fr === 1 && dr === 2 && dc === 0 && !dest && !board[fr + 1][fc])
                return true;
            // diagonal capture
            if (dr === 1 && adx === 1 && dest && dest.color === 'black')
                return true;
            return false;
        case 'rook':
            if (fr === tr || fc === tc) {
                var stepR = fr === tr ? 0 : dr / ady;
                var stepC = fc === tc ? 0 : dc / adx;
                for (var r = fr + stepR, c = fc + stepC; r !== tr || c !== tc; r += stepR, c += stepC) {
                    if (board[r][c])
                        return false;
                }
                return true;
            }
            return false;
        case 'bishop':
            if (ady === adx) {
                var stepR = dr / ady, stepC = dc / adx;
                for (var r = fr + stepR, c = fc + stepC; r !== tr && c !== tc; r += stepR, c += stepC) {
                    if (board[r][c])
                        return false;
                }
                return true;
            }
            return false;
        case 'knight':
            if ((ady === 2 && adx === 1) || (ady === 1 && adx === 2))
                return true;
            return false;
        case 'queen':
            // rook-like
            if (fr === tr || fc === tc) {
                var stepR = fr === tr ? 0 : dr / ady;
                var stepC = fc === tc ? 0 : dc / adx;
                for (var r = fr + stepR, c = fc + stepC; r !== tr || c !== tc; r += stepR, c += stepC) {
                    if (board[r][c])
                        return false;
                }
                return true;
            }
            // bishop-like
            if (ady === adx) {
                var stepR = dr / ady, stepC = dc / adx;
                for (var r = fr + stepR, c = fc + stepC; r !== tr && c !== tc; r += stepR, c += stepC) {
                    if (board[r][c])
                        return false;
                }
                return true;
            }
            return false;
        case 'king':
            // one-step
            if (ady <= 1 && adx <= 1 && (!dest || dest.color === 'black'))
                return true;
            // castling
            if (!piece.moved && fr === 0 && fc === 4 && dr === 0 && adx === 2) {
                // kingside
                if (tc === 6) {
                    var rook = board[0][7];
                    if ((rook === null || rook === void 0 ? void 0 : rook.type) === 'rook' &&
                        !rook.moved &&
                        !board[0][5] && !board[0][6])
                        return true;
                }
                // queenside
                if (tc === 2) {
                    var rook = board[0][0];
                    if ((rook === null || rook === void 0 ? void 0 : rook.type) === 'rook' &&
                        !rook.moved &&
                        !board[0][1] && !board[0][2] && !board[0][3])
                        return true;
                }
            }
            return false;
        default:
            return false;
    }
}
function addPiecesToBoard(board, placements) {
    var b2 = cloneBoard(board);
    for (var _i = 0, placements_1 = placements; _i < placements_1.length; _i++) {
        var _a = placements_1[_i], row = _a.row, col = _a.col, piece = _a.piece;
        if (row < 0 || row > 7 || col < 0 || col > 7) {
            console.warn("Skipping invalid placement at [".concat(row, ",").concat(col, "]"));
            continue;
        }
        b2[row][col] = __assign({}, piece);
    }
    return b2;
}
