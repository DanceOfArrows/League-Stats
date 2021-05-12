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
    String = _Schema$Types.String;
var SummonerSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true
  },
  data: {
    required: true,
    type: Mixed
  },
  lastUpdated: {
    required: true,
    type: Date
  }
});

var SummonerData = _mongoose["default"].model("summoner", SummonerSchema);

var _default = SummonerData;
exports["default"] = _default;