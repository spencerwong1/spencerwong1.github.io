"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Profile;
var jsx_runtime_1 = require("react/jsx-runtime");
require("../css/profile.css");
var brilliant_png_1 = require("../assets/brilliant.png");
var character_png_1 = require("../assets/character.png");
function Profile() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "profile-box", children: [(0, jsx_runtime_1.jsx)("div", { className: "brilliant-box", children: (0, jsx_runtime_1.jsxs)("h1", { className: "brilliant-text title-text", children: [" Brilliant Move! ", (0, jsx_runtime_1.jsx)("img", { className: "brilliant-img", src: brilliant_png_1.default }), " "] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "profile-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "title-box", children: (0, jsx_runtime_1.jsx)("h1", { className: "title-text text", children: " Profile Card " }) }), (0, jsx_runtime_1.jsx)("div", { className: "img-box", children: (0, jsx_runtime_1.jsx)("img", { src: character_png_1.default, className: "profile-img" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "info", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-box text", children: [(0, jsx_runtime_1.jsx)("span", { children: " Name: " }), (0, jsx_runtime_1.jsx)("span", { children: " Spencer Wong " })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-box text", children: [(0, jsx_runtime_1.jsx)("span", { children: " University: " }), (0, jsx_runtime_1.jsx)("span", { children: " UNSW " })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-box text", children: [(0, jsx_runtime_1.jsx)("span", { children: " Degree: " }), (0, jsx_runtime_1.jsx)("span", { children: " Computer Science  & Commerce " })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-box text", children: [(0, jsx_runtime_1.jsx)("span", { children: " Favourite Opening: " }), (0, jsx_runtime_1.jsx)("span", { children: " The Ruy Lopez " })] })] })] })] }));
}
