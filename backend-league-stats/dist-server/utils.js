"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeCheck = exports.summonerIdNameObj = exports.queueIdInfo = exports.fetchHandler = exports.convertChampionIds = exports.asyncHandler = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _config = require("./config");

var _champion = _interopRequireDefault(require("./models/champion.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var queueIdInfo = [{
  queueId: 0,
  map: "Custom",
  description: null
}, {
  queueId: 2,
  map: "Summoner's Rift",
  description: "5v5 Blind Pick"
}, {
  queueId: 4,
  map: "Summoner's Rift",
  description: "5v5 Ranked Solo"
}, {
  queueId: 6,
  map: "Summoner's Rift",
  description: "5v5 Ranked Premade"
}, {
  queueId: 7,
  map: "Summoner's Rift",
  description: "Co-op vs AI"
}, {
  queueId: 8,
  map: "Twisted Treeline",
  description: "3v3 Normal"
}, {
  queueId: 9,
  map: "Twisted Treeline",
  description: "3v3 Ranked Flex"
}, {
  queueId: 14,
  map: "Summoner's Rift",
  description: "5v5 Draft Pick"
}, {
  queueId: 16,
  map: "Crystal Scar",
  description: "5v5 Dominion Blind Pick"
}, {
  queueId: 17,
  map: "Crystal Scar",
  description: "5v5 Dominion Draft Pick"
}, {
  queueId: 25,
  map: "Crystal Scar",
  description: "Dominion Co-op vs AI"
}, {
  queueId: 31,
  map: "Summoner's Rift",
  description: "Co-op vs AI Intro Bot"
}, {
  queueId: 32,
  map: "Summoner's Rift",
  description: "Co-op vs AI Beginner Bot"
}, {
  queueId: 33,
  map: "Summoner's Rift",
  description: "Co-op vs AI Intermediate Bot"
}, {
  queueId: 41,
  map: "Twisted Treeline",
  description: "3v3 Ranked Team"
}, {
  queueId: 42,
  map: "Summoner's Rift",
  description: "5v5 Ranked Team"
}, {
  queueId: 52,
  map: "Twisted Treeline",
  description: "Co-op vs AI"
}, {
  queueId: 61,
  map: "Summoner's Rift",
  description: "5v5 Team Builder"
}, {
  queueId: 65,
  map: "Howling Abyss",
  description: "5v5 ARAM"
}, {
  queueId: 67,
  map: "Howling Abyss",
  description: "ARAM Co-op vs AI"
}, {
  queueId: 70,
  map: "Summoner's Rift",
  description: "One for All"
}, {
  queueId: 72,
  map: "Howling Abyss",
  description: "1v1 Snowdown Showdown"
}, {
  queueId: 73,
  map: "Howling Abyss",
  description: "2v2 Snowdown Showdown"
}, {
  queueId: 75,
  map: "Summoner's Rift",
  description: "6v6 Hexakill"
}, {
  queueId: 76,
  map: "Summoner's Rift",
  description: "Ultra Rapid Fire"
}, {
  queueId: 78,
  map: "Howling Abyss",
  description: "One For All: Mirror Mode"
}, {
  queueId: 83,
  map: "Summoner's Rift",
  description: "Co-op vs AI Ultra Rapid Fire"
}, {
  queueId: 91,
  map: "Summoner's Rift",
  description: "Doom Bots Rank 1"
}, {
  queueId: 92,
  map: "Summoner's Rift",
  description: "Doom Bots Rank 2"
}, {
  queueId: 93,
  map: "Summoner's Rift",
  description: "Doom Bots Rank 5"
}, {
  queueId: 96,
  map: "Crystal Scar",
  description: "Ascension"
}, {
  queueId: 98,
  map: "Twisted Treeline",
  description: "6v6 Hexakill"
}, {
  queueId: 100,
  map: "Butcher's Bridge",
  description: "5v5 ARAM"
}, {
  queueId: 300,
  map: "Howling Abyss",
  description: "Legend of the Poro King"
}, {
  queueId: 310,
  map: "Summoner's Rift",
  description: "Nemesis"
}, {
  queueId: 313,
  map: "Summoner's Rift",
  description: "Black Market Brawlers"
}, {
  queueId: 315,
  map: "Summoner's Rift",
  description: "Nexus Siege"
}, {
  queueId: 317,
  map: "Crystal Scar",
  description: "Definitely Not Dominion"
}, {
  queueId: 318,
  map: "Summoner's Rift",
  description: "ARURF"
}, {
  queueId: 325,
  map: "Summoner's Rift",
  description: "All Random"
}, {
  queueId: 400,
  map: "Summoner's Rift",
  description: "5v5 Draft Pick"
}, {
  queueId: 410,
  map: "Summoner's Rift",
  description: "5v5 Ranked Dynamic"
}, {
  queueId: 420,
  map: "Summoner's Rift",
  description: "5v5 Ranked Solo"
}, {
  queueId: 430,
  map: "Summoner's Rift",
  description: "5v5 Blind Pick"
}, {
  queueId: 440,
  map: "Summoner's Rift",
  description: "5v5 Ranked Flex"
}, {
  queueId: 450,
  map: "Howling Abyss",
  description: "5v5 ARAM"
}, {
  queueId: 460,
  map: "Twisted Treeline",
  description: "3v3 Blind Pick"
}, {
  queueId: 470,
  map: "Twisted Treeline",
  description: "3v3 Ranked Flex"
}, {
  queueId: 600,
  map: "Summoner's Rift",
  description: "Blood Hunt Assassin"
}, {
  queueId: 610,
  map: "Cosmic Ruins",
  description: "Dark Star: Singularity"
}, {
  queueId: 700,
  map: "Summoner's Rift",
  description: "Clash"
}, {
  queueId: 800,
  map: "Twisted Treeline",
  description: "Co-op vs. AI Intermediate Bot"
}, {
  queueId: 810,
  map: "Twisted Treeline",
  description: "Co-op vs. AI Intro Bot"
}, {
  queueId: 820,
  map: "Twisted Treeline",
  description: "Co-op vs. AI Beginner Bot"
}, {
  queueId: 830,
  map: "Summoner's Rift",
  description: "Co-op vs. AI Intro Bot"
}, {
  queueId: 840,
  map: "Summoner's Rift",
  description: "Co-op vs. AI Beginner Bot"
}, {
  queueId: 850,
  map: "Summoner's Rift",
  description: "Co-op vs. AI Intermediate Bot"
}, {
  queueId: 900,
  map: "Summoner's Rift",
  description: "URF"
}, {
  queueId: 910,
  map: "Crystal Scar",
  description: "Ascension"
}, {
  queueId: 920,
  map: "Howling Abyss",
  description: "Legend of the Poro King"
}, {
  queueId: 940,
  map: "Summoner's Rift",
  description: "Nexus Siege"
}, {
  queueId: 950,
  map: "Summoner's Rift",
  description: "Doom Bots Voting"
}, {
  queueId: 960,
  map: "Summoner's Rift",
  description: "Doom Bots Standard"
}, {
  queueId: 980,
  map: "Valoran City Park",
  description: "Star Guardian Invasion: Normal"
}, {
  queueId: 990,
  map: "Valoran City Park",
  description: "Star Guardian Invasion: Onslaught"
}, {
  queueId: 1000,
  map: "Overcharge",
  description: "PROJECT: Hunters"
}, {
  queueId: 1010,
  map: "Summoner's Rift",
  description: "Snow ARURF"
}, {
  queueId: 1020,
  map: "Summoner's Rift",
  description: "One for All"
}, {
  queueId: 1030,
  map: "Crash Site",
  description: "Odyssey Extraction: Intro"
}, {
  queueId: 1040,
  map: "Crash Site",
  description: "Odyssey Extraction: Cadet"
}, {
  queueId: 1050,
  map: "Crash Site",
  description: "Odyssey Extraction: Crewmember"
}, {
  queueId: 1060,
  map: "Crash Site",
  description: "Odyssey Extraction: Captain"
}, {
  queueId: 1070,
  map: "Crash Site",
  description: "Odyssey Extraction: Onslaught"
}, {
  queueId: 1090,
  map: "Convergence",
  description: "Teamfight Tactics"
}, {
  queueId: 1100,
  map: "Convergence",
  description: "Ranked Teamfight Tactics"
}, {
  queueId: 1110,
  map: "Convergence",
  description: "Teamfight Tactics Tutorial"
}, {
  queueId: 1111,
  map: "Convergence",
  description: "Teamfight Tactics test"
}, {
  queueId: 1200,
  map: "Nexus Blitz",
  description: "Nexus Blitz"
}, {
  queueId: 1300,
  map: "Nexus Blitz",
  description: "Nexus Blitz"
}, {
  queueId: 2000,
  map: "Summoner's Rift",
  description: "Tutorial 1"
}, {
  queueId: 2010,
  map: "Summoner's Rift",
  description: "Tutorial 2"
}, {
  queueId: 2020,
  map: "Summoner's Rift",
  description: "Tutorial 3"
}, {
  queueId: 1400,
  map: "Summoner's Rift",
  description: "Ultimate Spellbook"
}];
/* Middleware to handle exceptions */

exports.queueIdInfo = queueIdInfo;

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
            if (!(championIds === -1)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", {
              championName: null,
              displayName: null
            });

          case 2:
            _context2.prev = 2;

            if (!Array.isArray(championIds)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return Promise.all(championIds.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(championId) {
                var champion, championName, displayName;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(championId === -1)) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return", {
                          championName: null,
                          displayName: null
                        });

                      case 2:
                        _context.next = 4;
                        return _champion["default"].findOne({
                          championId: championId
                        }).lean();

                      case 4:
                        champion = _context.sent;

                        if (champion) {
                          _context.next = 7;
                          break;
                        }

                        throw missingChampionErr(championId);

                      case 7:
                        championName = champion.championName, displayName = champion.displayName;
                        return _context.abrupt("return", {
                          championName: championName,
                          displayName: displayName
                        });

                      case 9:
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

          case 6:
            champions = _context2.sent;
            return _context2.abrupt("return", champions);

          case 8:
            if (!(typeof championIds === "number")) {
              _context2.next = 16;
              break;
            }

            _context2.next = 11;
            return _champion["default"].findOne({
              championId: championIds
            }).lean();

          case 11:
            champion = _context2.sent;

            if (champion) {
              _context2.next = 14;
              break;
            }

            throw missingChampionErr(championIds);

          case 14:
            championName = champion.championName, displayName = champion.displayName;
            return _context2.abrupt("return", {
              championName: championName,
              displayName: displayName
            });

          case 16:
            _context2.next = 24;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](2);

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
    }, _callee2, null, [[2, 18]]);
  }));

  return function convertChampionIds(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* Convert Summoner IDs to name */


exports.convertChampionIds = convertChampionIds;
var summonerIdNameObj = {
  21: "SummonerBarrier",
  1: "SummonerBoost",
  14: "SummonerDot",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  13: "SummonerMana",
  30: "SummonerPoroRecall",
  31: "SummonerPoroThrow",
  11: "SummonerSmite",
  39: "SummonerSnowURFSnowball_Mark",
  32: "SummonerSnowball",
  12: "SummonerTeleport"
};
/* Fetch function to prevent repeating of headers */

exports.summonerIdNameObj = summonerIdNameObj;

var fetchHandler = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(path, isRegionRoute) {
    var res, parsedRes, fetchErr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (isRegionRoute) {
              _context3.next = 6;
              break;
            }

            _context3.next = 3;
            return (0, _nodeFetch["default"])("https://na1.api.riotgames.com/".concat(path), {
              headers: {
                "X-Riot-Token": _config.riotKey
              }
            });

          case 3:
            _context3.t0 = _context3.sent;
            _context3.next = 9;
            break;

          case 6:
            _context3.next = 8;
            return (0, _nodeFetch["default"])("https://americas.api.riotgames.com/".concat(path), {
              headers: {
                "X-Riot-Token": _config.riotKey
              }
            });

          case 8:
            _context3.t0 = _context3.sent;

          case 9:
            res = _context3.t0;
            _context3.next = 12;
            return res.json();

          case 12:
            parsedRes = _context3.sent;

            if (!res.ok) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", parsedRes);

          case 17:
            fetchErr = new Error(parsedRes.status.message);
            fetchErr.status = parsedRes.status.status_code;
            fetchErr.title = "Fetch from Riot API Error";
            throw fetchErr;

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchHandler(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/* Check if time is older than 2 minutes */


exports.fetchHandler = fetchHandler;

var timeCheck = function timeCheck(timeToCompare) {
  return Date.parse(new Date()) >= Date.parse(timeToCompare) + 120000;
};

exports.timeCheck = timeCheck;