"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeCheck = exports.fetchHandler = exports.convertChampionIds = exports.asyncHandler = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _config = require("./config");

var _champion = _interopRequireDefault(require("./models/champion.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* Middleware to handle exceptions */
var asyncHandler = function asyncHandler(handler) {
  return function (req, res, next) {
    return handler(req, res, next)["catch"](next);
  };
};
/* Error to throw when unable to find a champion by ID */


exports.asyncHandler = asyncHandler;

var missingChampionErr = function missingChampionErr(championId) {
  var failedToFindErr = new Error("Failed to find a champion with the id ".concat(championId));
  failedToFindErr.status = 404;
  failedToFindErr.title = "Champion ID Convert Error";
  return failedToFindErr;
};
/* Convert championId(s) to championName(s) */


var convertChampionIds = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(championIds) {
    var champions, champion, championName, displayName, convertErr;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!Array.isArray(championIds)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return Promise.all(championIds.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(championId) {
                var champion, championName, displayName;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _champion["default"].findOne({
                          championId: championId
                        }).lean();

                      case 2:
                        champion = _context.sent;

                        if (champion) {
                          _context.next = 5;
                          break;
                        }

                        throw missingChampionErr(championId);

                      case 5:
                        championName = champion.championName, displayName = champion.displayName;
                        return _context.abrupt("return", {
                          championName: championName,
                          displayName: displayName
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 4:
            champions = _context2.sent;
            return _context2.abrupt("return", champions);

          case 6:
            ;
            /* Check if a single number sent to be converted then convert */

            if (!(typeof championIds === 'number')) {
              _context2.next = 15;
              break;
            }

            _context2.next = 10;
            return _champion["default"].findOne({
              championId: championIds
            }).lean();

          case 10:
            champion = _context2.sent;

            if (champion) {
              _context2.next = 13;
              break;
            }

            throw missingChampionErr(championIds);

          case 13:
            championName = champion.championName, displayName = champion.displayName;
            return _context2.abrupt("return", {
              championName: championName,
              displayName: displayName
            });

          case 15:
            ;
            _context2.next = 24;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);

            /* Catch any other errors that might occur */
            convertErr = new Error(_context2.t0.message);
            convertErr.status = 400;
            convertErr.title = "Champion ID Convert Error";
            throw convertErr;

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function convertChampionIds(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* Fetch function to prevent repeating of headers */


exports.convertChampionIds = convertChampionIds;

var fetchHandler = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(path) {
    var res, parsedRes, fetchErr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _nodeFetch["default"])("https://na1.api.riotgames.com/".concat(path), {
              headers: {
                'X-Riot-Token': _config.riotKey
              }
            });

          case 2:
            res = _context3.sent;
            _context3.next = 5;
            return res.json();

          case 5:
            parsedRes = _context3.sent;

            if (!res.ok) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", parsedRes);

          case 10:
            fetchErr = new Error(parsedRes.status.message);
            fetchErr.status = parsedRes.status.status_code;
            fetchErr.title = "Fetch from Riot API Error";
            throw fetchErr;

          case 14:
            ;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchHandler(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/* Check if time is older than 2 minutes */


exports.fetchHandler = fetchHandler;

var timeCheck = function timeCheck(timeToCompare) {
  return Date.parse(new Date()) >= Date.parse(timeToCompare) + 120000;
};

exports.timeCheck = timeCheck;