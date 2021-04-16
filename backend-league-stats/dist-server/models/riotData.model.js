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
var RiotDataSchema = new Schema({
  type: {
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

var RiotData = _mongoose["default"].model('riotData', RiotDataSchema);

var _default = RiotData;
exports["default"] = _default;