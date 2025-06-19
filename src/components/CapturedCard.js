"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapturedCard = CapturedCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var Dropfinder_1 = require("./Dropfinder");
var Ezmail_1 = require("./Ezmail");
var Cryptokraker_1 = require("./Cryptokraker");
var Profile_1 = require("./Profile");
function CapturedCard(_a) {
    var piece = _a.piece;
    switch (piece.type) {
        case "ezmail":
            return (0, jsx_runtime_1.jsx)(Ezmail_1.default, {});
        case "dropfinder":
            return (0, jsx_runtime_1.jsx)(Dropfinder_1.default, {});
        case "profile":
            return (0, jsx_runtime_1.jsx)(Profile_1.default, {});
        case "cryptoKraker":
            return (0, jsx_runtime_1.jsx)(Cryptokraker_1.default, {});
        default:
            return null;
    }
}
