"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var _Schema$Types = Schema.Types,
    Number = _Schema$Types.Number,
    String = _Schema$Types.String;
var ChampionSchema = new Schema({
  championId: {
    required: true,
    type: Number,
    unique: true
  },
  championName: {
    required: true,
    type: String,
    unique: true
  },
  displayName: {
    required: true,
    type: String,
    unique: true
  }
});

var Champion = _mongoose["default"].model('champion', ChampionSchema);

var _default = Champion;
exports["default"] = _default;