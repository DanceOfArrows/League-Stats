"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

require("@babel/polyfill");

var _config = require("./config");

var _championRotation = _interopRequireDefault(require("./routes/championRotation"));

var _leaderboard = _interopRequireDefault(require("./routes/leaderboard"));

var _summoner = _interopRequireDefault(require("./routes/summoner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])()); // app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/championRotation", _championRotation["default"]);
app.use("/leaderboard", _leaderboard["default"]);
app.use("/summoner", _summoner["default"]);
/* Connect to MongoDB */

_mongoose["default"].connect(_config.database_uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  // flag needed to enable findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/* Check if server is running */


app.get("/", function (req, res) {
  res.json("Server is running!");
});
/* Error Handlers */

app.use(function (req, res, next) {
  var err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    title: err.title || "Uncaught Error",
    message: err.message
  });
});
var _default = app;
exports["default"] = _default;