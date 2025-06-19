"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Board;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var chessRules_1 = require("../chessRules");
require("../css/board.css");
// png imports 
var wp_png_1 = require("../assets/wp.png");
var wr_png_1 = require("../assets/wr.png");
var wn_png_1 = require("../assets/wn.png");
var wb_png_1 = require("../assets/wb.png");
var wq_png_1 = require("../assets/wq.png");
var wk_png_1 = require("../assets/wk.png");
var ezmail_png_1 = require("../assets/ezmail.png");
var dropfinder1_png_1 = require("../assets/dropfinder1.png");
var github_png_1 = require("../assets/github.png");
var linkedin_png_1 = require("../assets/linkedin.png");
var black_king_png_1 = require("../assets/black-king.png");
var Cryptokraker_png_1 = require("../assets/Cryptokraker.png");
var CapturedCard_1 = require("./CapturedCard");
var initialBoard = __spreadArray([
    [
        { type: 'rook', moved: false, color: 'white' },
        { type: 'knight', moved: false, color: 'white' },
        { type: 'bishop', moved: false, color: 'white' },
        { type: 'queen', moved: false, color: 'white' },
        { type: 'king', moved: false, color: 'white' },
        { type: 'bishop', moved: false, color: 'white' },
        { type: 'knight', moved: false, color: 'white' },
        { type: 'rook', moved: false, color: 'white' }
    ],
    // rank 1: 8 pawns
    Array(8).fill({ type: 'pawn', moved: false, color: 'white' })
], Array.from({ length: 6 }, function () { return Array(8).fill(null); }), true);
var customPlacements = [
    { row: 5, col: 5, piece: { type: 'dropfinder', moved: false, color: 'black' } },
    { row: 4, col: 2, piece: { type: 'ezmail', moved: false, color: 'black' } },
    { row: 7, col: 6, piece: { type: 'github', moved: false, color: 'black' } },
    { row: 6, col: 1, piece: { type: 'linkedin', moved: false, color: 'black' } },
    { row: 6, col: 3, piece: { type: 'profile', moved: false, color: 'black' } },
    { row: 4, col: 7, piece: { type: 'cryptoKraker', moved: false, color: 'black' } },
];
function Board() {
    var _a = (0, react_1.useState)(function () { return (0, chessRules_1.addPiecesToBoard)(initialBoard, customPlacements); }), board = _a[0], setBoard = _a[1];
    var _b = (0, react_1.useState)(null), hoverSquare = _b[0], setHoverSquare = _b[1];
    var boardRef = (0, react_1.useRef)(null);
    var ghostRef = (0, react_1.useRef)(null);
    var dragStartRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(0), progress = _c[0], setProgress = _c[1];
    var _d = (0, react_1.useState)(6), blackPieces = _d[0], setBlackPieces = _d[1];
    var _e = (0, react_1.useState)(null), capturedPiece = _e[0], setCapturedPiece = _e[1];
    var _f = (0, react_1.useState)(null), dragging = _f[0], setDragging = _f[1];
    var _g = (0, react_1.useState)(true), initial = _g[0], setInitial = _g[1];
    (0, react_1.useEffect)(function () {
        // after 2s of max delay + 0.5s anim, remove the class
        var totalMs = (2 + 0.5) * 1000;
        var id = setTimeout(function () { return setInitial(false); }, totalMs);
        return function () { return clearTimeout(id); };
    }, []);
    (0, react_1.useEffect)(function () {
        var t = setTimeout(function () { return setProgress(50); }, 100);
        return function () { return clearTimeout(t); };
    }, []);
    // Precompute random delays (0–2s) for each square once
    var delays = (0, react_1.useMemo)(function () {
        return Array.from({ length: 8 }, function () {
            return Array.from({ length: 8 }, function () { return Math.random() * 2; });
        } // 0–2 seconds
        );
    }, []);
    var imgOf = function (p) {
        return ({ pawn: wp_png_1.default, rook: wr_png_1.default, knight: wn_png_1.default, bishop: wb_png_1.default, queen: wq_png_1.default, king: wk_png_1.default, ezmail: ezmail_png_1.default, dropfinder: dropfinder1_png_1.default, github: github_png_1.default, linkedin: linkedin_png_1.default, profile: black_king_png_1.default, cryptoKraker: Cryptokraker_png_1.default }[p.type]);
    };
    // Open websites upon github or linkedin
    function handleCapture(target) {
        if (target.color == 'black') {
            setProgress(function (p) { return p + 50 / 6; });
            setBlackPieces(function (n) { return n - 1; });
            setCapturedPiece(target);
        }
        switch (target.type) {
            case 'github':
                window.open('https://github.com/spencerwong1', '_blank');
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/in/spencerwongg/', '_blank');
                break;
            case 'ezmail':
                window.open('https://spencerwong1.github.io/ezmail/', '_blank');
                break;
            case 'dropfinder':
                window.open('https://spencerwong1.github.io/dropfinder/', '_blank');
                break;
            default:
                break;
        }
    }
    function onPointerDown(e, r, c) {
        e.preventDefault();
        dragStartRef.current = { fromR: r, fromC: c };
        // spawn ghost image
        var img = e.currentTarget;
        var ghost = img.cloneNode(true);
        ghost.style.position = 'absolute';
        ghost.style.pointerEvents = 'none';
        ghost.style.width = "".concat(img.clientWidth, "px");
        ghost.style.height = "".concat(img.clientHeight, "px");
        document.body.appendChild(ghost);
        ghost.style.left = "".concat(e.pageX - img.clientWidth / 2, "px");
        ghost.style.top = "".concat(e.pageY - img.clientHeight / 2, "px");
        ghostRef.current = ghost;
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        dragStartRef.current = { fromR: r, fromC: c };
        setDragging({ r: r, c: c }); // set dragging state
        img.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
        var ghost = ghostRef.current;
        var br = boardRef.current;
        if (!ghost || !br)
            return;
        // move ghost
        ghost.style.left = "".concat(e.pageX - ghost.clientWidth / 2, "px");
        ghost.style.top = "".concat(e.pageY - ghost.clientHeight / 2, "px");
        // compute which square we're over
        var rect = br.getBoundingClientRect();
        var size = rect.width / 8;
        var cx = e.clientX - rect.left;
        var cy = rect.bottom - e.clientY;
        var c = Math.floor(cx / size);
        var r = Math.floor(cy / size);
        // only keep it if on-board
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            setHoverSquare({ r: r, c: c });
        }
        else {
            setHoverSquare(null);
        }
    }
    function onPointerUp(e) {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        var start = dragStartRef.current;
        var ghost = ghostRef.current;
        var br = boardRef.current;
        if (start && ghost && br) {
            var rect = br.getBoundingClientRect();
            var sq = rect.width / 8;
            var tc_1 = Math.floor((e.clientX - rect.left) / sq);
            var tr_1 = Math.floor((rect.bottom - e.clientY) / sq);
            var fr_1 = start.fromR, fc_1 = start.fromC;
            var target = board[tr_1][tc_1];
            if ((0, chessRules_1.isLegalMove)(board, fr_1, fc_1, tr_1, tc_1)) {
                if (target && ['ezmail', 'dropfinder', 'github', 'linkedin', 'profile', 'cryptoKraker'].includes(target.type)) {
                    handleCapture(target);
                }
                setBoard(function (b) { return (0, chessRules_1.doMove)(b, fr_1, fc_1, tr_1, tc_1); });
            }
            document.body.removeChild(ghost);
        }
        // cleanup fade state & refs
        dragStartRef.current = null;
        ghostRef.current = null;
        setDragging(null); // reset dragging
        dragStartRef.current = null;
        ghostRef.current = null;
        e.target.releasePointerCapture(e.pointerId);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "board-wrapper".concat(initial ? ' initial' : ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: "progress-bar", children: [(0, jsx_runtime_1.jsx)("div", { className: "progress-fill", style: { height: "".concat(progress, "%") } }), (0, jsx_runtime_1.jsx)("div", { className: "progress-label", children: blackPieces !== 0 ? "M".concat(blackPieces) : '1-0' })] }), (0, jsx_runtime_1.jsx)("div", { className: "border", children: (0, jsx_runtime_1.jsx)("div", { ref: boardRef, className: "board", children: board
                        .slice().reverse()
                        .map(function (row, revR) {
                        return row.map(function (piece, c) {
                            var r = 7 - revR;
                            var isHovered = (hoverSquare === null || hoverSquare === void 0 ? void 0 : hoverSquare.r) === r && (hoverSquare === null || hoverSquare === void 0 ? void 0 : hoverSquare.c) === c;
                            return ((0, jsx_runtime_1.jsx)("div", { className: "square".concat(isHovered ? ' hovered' : ''), children: piece && ((0, jsx_runtime_1.jsx)("img", { draggable: false, src: imgOf(piece), onPointerDown: function (e) { return onPointerDown(e, r, c); }, className: "piece".concat((dragging === null || dragging === void 0 ? void 0 : dragging.r) === r && (dragging === null || dragging === void 0 ? void 0 : dragging.c) === c ? ' faded' : ''), style: {
                                        /* just set the per-square delay */
                                        '--delay': "".concat(delays[r][c], "s")
                                    } })) }, "".concat(r, "-").concat(c)));
                        });
                    }) }) }), capturedPiece && (0, jsx_runtime_1.jsx)(CapturedCard_1.CapturedCard, { piece: capturedPiece })] }));
}
