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
    var storedRotation, isUpdateRequired, championRotation, freeChampionIds, freeChampionIdsForNewPlayers, maxNewPlayerLevel, freeChampionNames, freeChampionNamesForNewPlayers, updatedData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _riotData["default"].findOne({
              type: 'championRotation'
            });

          case 2:
            storedRotation = _context.sent;
            isUpdateRequired = (0, _utils.timeCheck)(storedRotation.lastUpdated);

            if (!isUpdateRequired) {
              _context.next = 23;
              break;
            }

            _context.next = 7;
            return (0, _utils.fetchHandler)('lol/platform/v3/champion-rotations/');

          case 7:
            championRotation = _context.sent;
            freeChampionIds = championRotation.freeChampionIds, freeChampionIdsForNewPlayers = championRotation.freeChampionIdsForNewPlayers, maxNewPlayerLevel = championRotation.maxNewPlayerLevel;
            _context.next = 11;
            return (0, _utils.convertChampionIds)(freeChampionIds);

          case 11:
            freeChampionNames = _context.sent;
            _context.next = 14;
            return (0, _utils.convertChampionIds)(freeChampionIdsForNewPlayers);

          case 14:
            freeChampionNamesForNewPlayers = _context.sent;
            updatedData = {
              freeChampionNames: freeChampionNames,
              freeChampionNamesForNewPlayers: freeChampionNamesForNewPlayers,
              maxNewPlayerLevel: maxNewPlayerLevel
            };
            storedRotation.data = updatedData;
            storedRotation.lastUpdated = new Date();
            _context.next = 20;
            return storedRotation.save();

          case 20:
            res.json(updatedData);
            _context.next = 24;
            break;

          case 23:
            res.json(storedRotation.data);

          case 24:
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