"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var _Schema$Types = Schema.Types,
    Date = _Schema$Types.Date,
    Mixed = _Schema$Types.Mixed,
    Number = _Schema$Types.Number;
var MatchSchema = new Schema({
  matchId: {
    required: true,
    type: Number,
    unique: true
  },
  data: {
    required: true,
    type: Mixed
  }
});

var MatchData = _mongoose["default"].model("match", MatchSchema);

var _default = MatchData;
exports["default"] = _default;