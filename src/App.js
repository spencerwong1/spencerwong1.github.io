"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var NavBar_1 = require("./components/NavBar");
var Board_1 = require("./components/Board");
require("./App.css");
function App() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(NavBar_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: 'main', children: (0, jsx_runtime_1.jsx)(Board_1.default, {}) })] }));
}
