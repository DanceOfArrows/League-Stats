"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _riotData = _interopRequireDefault(require("../models/riotData.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();
/* Grab champion rotation data from Riot API */


router.get('/', (0, _utils.asyncHandler)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var storedLeaderboard, isUpdateRequired, challengerLeague, entries, updatedData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _riotData["default"].findOne({
              type: 'leaderboard'
            });

          case 2:
            storedLeaderboard = _context.sent;
            isUpdateRequired = (0, _utils.timeCheck)(storedLeaderboard.lastUpdated);

            if (!isUpdateRequired) {
              _context.next = 19;
              break;
            }

            _context.next = 7;
            return (0, _utils.fetchHandler)('lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5/');

          case 7:
            challengerLeague = _context.sent;
            entries = challengerLeague.entries;
            _context.next = 11;
            return Promise.all(entries.map(function (_ref2) {
              var summonerName = _ref2.summonerName,
                  wins = _ref2.wins,
                  losses = _ref2.losses,
                  leaguePoints = _ref2.leaguePoints;
              return {
                summonerName: summonerName,
                wins: wins,
                losses: losses,
                leaguePoints: leaguePoints
              };
            }));

          case 11:
            updatedData = _context.sent;
            storedLeaderboard.data = updatedData;
            storedLeaderboard.lastUpdated = new Date();
            _context.next = 16;
            return storedLeaderboard.save();

          case 16:
            res.json(updatedData);
            _context.next = 20;
            break;

          case 19:
            res.json(storedLeaderboard.data);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
var _default = router;
exports["default"] = _default;