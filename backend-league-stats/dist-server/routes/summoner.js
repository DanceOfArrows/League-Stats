"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _match = _interopRequireDefault(require("../models/match.model"));

var _summoner = _interopRequireDefault(require("../models/summoner.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();
/* Grab summoner data from Riot API */


router.get("/:summonerName", (0, _utils.asyncHandler)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var summonerName, storedSummoner, isUpdateRequired, summonerData, accountId, name, profileIconId, puuid, summonerLevel, summonerMatches, matches, matchDataArr, newSummoner;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            summonerName = req.params.summonerName;
            _context2.next = 4;
            return _summoner["default"].findOne({
              name: summonerName
            });

          case 4:
            storedSummoner = _context2.sent;
            isUpdateRequired = storedSummoner ? (0, _utils.timeCheck)(storedSummoner.lastUpdated) : true;

            if (!isUpdateRequired) {
              _context2.next = 32;
              break;
            }

            _context2.next = 9;
            return (0, _utils.fetchHandler)("lol/summoner/v4/summoners/by-name/".concat(summonerName));

          case 9:
            summonerData = _context2.sent;
            accountId = summonerData.accountId, name = summonerData.name, profileIconId = summonerData.profileIconId, puuid = summonerData.puuid, summonerLevel = summonerData.summonerLevel;
            /* Gets 10 recent matches.  This is due to API limitations (can go to 100, but rate limited to 20 per 1 sec and 100 per 2 min) */

            _context2.next = 13;
            return (0, _utils.fetchHandler)("lol/match/v4/matchlists/by-account/".concat(accountId, "?beginIndex=0&endIndex=10"));

          case 13:
            summonerMatches = _context2.sent;
            matches = summonerMatches.matches;
            /* Get match data for user */

            _context2.next = 17;
            return Promise.all(matches.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(match) {
                var matchId, timestamp, storedMatch, matchData, gameDuration, participants, participantIdentities, queueId, teams, _queueIdInfo$find, description, map, bans, bansFormatted, bansUnique, participantInfoArr, didWin, newMatch;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        matchId = match.gameId, timestamp = match.timestamp;
                        /* Check if a match is stored */

                        _context.next = 3;
                        return _match["default"].findOne({
                          matchId: matchId
                        });

                      case 3:
                        storedMatch = _context.sent;

                        if (storedMatch) {
                          _context.next = 21;
                          break;
                        }

                        _context.next = 7;
                        return (0, _utils.fetchHandler)("lol/match/v4/matches/".concat(matchId));

                      case 7:
                        matchData = _context.sent;
                        gameDuration = matchData.gameDuration, participants = matchData.participants, participantIdentities = matchData.participantIdentities, queueId = matchData.queueId, teams = matchData.teams;
                        /* Get info for the queueId */

                        _queueIdInfo$find = _utils.queueIdInfo.find(function (ele) {
                          return ele.queueId === queueId;
                        }), description = _queueIdInfo$find.description, map = _queueIdInfo$find.map;
                        /* Get bans and filter to make unique -> converts ids into names */

                        bans = teams[0].bans.length > 0 && teams[1].bans.length > 0 ? [].concat(_toConsumableArray(teams[0].bans), _toConsumableArray(teams[1].bans)) : [];
                        bansFormatted = bans.length > 0 ? bans.map(function (ban) {
                          return ban.championId;
                        }) : [];
                        bansUnique = bans.length > 0 ? (0, _utils.convertChampionIds)(_toConsumableArray(new Set(bansFormatted))) : [];
                        /* Gets relevant match data and summoner name of each player */

                        participantInfoArr = participants.map(function (participant) {
                          var participantId = participant.participantId,
                              championId = participant.championId,
                              spell1Id = participant.spell1Id,
                              spell2Id = participant.spell2Id,
                              stats = participant.stats;

                          var _participantIdentitie = participantIdentities.find(function (ele) {
                            return ele.participantId === participantId;
                          }),
                              summonerName = _participantIdentitie.player.summonerName;

                          return {
                            championId: championId,
                            spell1Id: spell1Id,
                            spell2Id: spell2Id,
                            stats: stats,
                            summonerName: summonerName
                          };
                        });
                        /* Get boolean for whether user won the match */

                        didWin = participantInfoArr.find(function (ele) {
                          return ele.summonerName === summonerName;
                        }).stats.win;
                        /* Create new match document */

                        newMatch = new _match["default"]({
                          matchId: matchId,
                          data: {
                            gameDuration: gameDuration,
                            description: description,
                            map: map,
                            bansUnique: bansUnique,
                            matchParticipantInfo: participantInfoArr,
                            didWin: didWin
                          }
                        });
                        _context.next = 18;
                        return newMatch.save();

                      case 18:
                        return _context.abrupt("return", newMatch.data);

                      case 21:
                        return _context.abrupt("return", storedMatch.data);

                      case 22:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 17:
            matchDataArr = _context2.sent;

            if (storedSummoner) {
              _context2.next = 25;
              break;
            }

            newSummoner = new _summoner["default"]({
              name: summonerName,
              data: {
                accountId: accountId,
                name: name,
                profileIconId: profileIconId,
                puuid: puuid,
                summonerLevel: summonerLevel,
                matches: matchDataArr
              },
              lastUpdated: new Date()
            });
            _context2.next = 22;
            return newSummoner.save();

          case 22:
            res.json(newSummoner.data);
            _context2.next = 30;
            break;

          case 25:
            storedSummoner.data = {
              accountId: accountId,
              name: name,
              profileIconId: profileIconId,
              puuid: puuid,
              summonerLevel: summonerLevel,
              matches: matchDataArr
            };
            storedSummoner.lastUpdated = new Date();
            _context2.next = 29;
            return storedSummoner.save();

          case 29:
            res.json(storedSummoner.data);

          case 30:
            _context2.next = 33;
            break;

          case 32:
            res.json(storedSummoner.data);

          case 33:
            _context2.next = 39;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            next(_context2.t0);

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 35]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
var _default = router;
exports["default"] = _default;