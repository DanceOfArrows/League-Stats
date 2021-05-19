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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var summonerName, summonerNameEncoded, storedSummoner, isUpdateRequired, summonerData, accountId, id, name, profileIconId, summonerLevel, summonerMatches, matches, matchDataArr, summonerRanks, ranks, newSummonerData, newSummoner;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            summonerName = req.params.summonerName;
            summonerNameEncoded = encodeURIComponent(summonerName);
            _context3.next = 5;
            return _summoner["default"].findOne({
              name: summonerName.toLowerCase()
            });

          case 5:
            storedSummoner = _context3.sent;
            isUpdateRequired = storedSummoner ? (0, _utils.timeCheck)(storedSummoner.lastUpdated) : true;

            if (!isUpdateRequired) {
              _context3.next = 38;
              break;
            }

            _context3.next = 10;
            return (0, _utils.fetchHandler)("lol/summoner/v4/summoners/by-name/".concat(summonerNameEncoded));

          case 10:
            summonerData = _context3.sent;
            accountId = summonerData.accountId, id = summonerData.id, name = summonerData.name, profileIconId = summonerData.profileIconId, summonerLevel = summonerData.summonerLevel;
            /* Gets 10 recent matches.  This is due to API limitations (can go to 100, but rate limited to 20 per 1 sec and 100 per 2 min) */

            _context3.next = 14;
            return (0, _utils.fetchHandler)("lol/match/v4/matchlists/by-account/".concat(accountId, "?beginIndex=0&endIndex=10"));

          case 14:
            summonerMatches = _context3.sent;
            matches = summonerMatches.matches;
            /* Get match data for summoner */

            _context3.next = 18;
            return Promise.all(matches.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(match) {
                var matchId, timestamp, storedMatch, matchData, gameDuration, participants, participantIdentities, queueId, teams, _queueIdInfo$find, description, map, bans, participantInfoArr, didWin, newMatch;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        matchId = match.gameId, timestamp = match.timestamp;
                        /* Check if a match is stored */

                        _context2.next = 3;
                        return _match["default"].findOne({
                          matchId: matchId
                        });

                      case 3:
                        storedMatch = _context2.sent;

                        if (storedMatch) {
                          _context2.next = 21;
                          break;
                        }

                        _context2.next = 7;
                        return (0, _utils.fetchHandler)("lol/match/v4/matches/".concat(matchId));

                      case 7:
                        matchData = _context2.sent;
                        gameDuration = matchData.gameDuration, participants = matchData.participants, participantIdentities = matchData.participantIdentities, queueId = matchData.queueId, teams = matchData.teams;
                        /* Get info for the queueId */

                        _queueIdInfo$find = _utils.queueIdInfo.find(function (ele) {
                          return ele.queueId === queueId;
                        }), description = _queueIdInfo$find.description, map = _queueIdInfo$find.map;
                        /* Get bans and filter to make unique -> converts ids into names */

                        bans = teams[0].bans.length > 0 && teams[1].bans.length > 0 ? [].concat(_toConsumableArray(teams[0].bans), _toConsumableArray(teams[1].bans)) : [];
                        /* Gets relevant match data and summoner name of each player */

                        _context2.next = 13;
                        return Promise.all(participants.map( /*#__PURE__*/function () {
                          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(participant) {
                            var participantId, championId, spell1Id, spell2Id, stats, _participantIdentitie, summonerName, ban, bannedChamp;

                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    participantId = participant.participantId, championId = participant.championId, spell1Id = participant.spell1Id, spell2Id = participant.spell2Id, stats = participant.stats;
                                    _participantIdentitie = participantIdentities.find(function (ele) {
                                      return ele.participantId === participantId;
                                    }), summonerName = _participantIdentitie.player.summonerName;
                                    ban = bans.length > 0 ? bans.find(function (ele) {
                                      return ele.pickTurn === participantId;
                                    }) : null;

                                    if (!(ban != null)) {
                                      _context.next = 9;
                                      break;
                                    }

                                    _context.next = 6;
                                    return (0, _utils.convertChampionIds)(ban.championId);

                                  case 6:
                                    _context.t0 = _context.sent;
                                    _context.next = 10;
                                    break;

                                  case 9:
                                    _context.t0 = null;

                                  case 10:
                                    bannedChamp = _context.t0;
                                    return _context.abrupt("return", {
                                      championId: championId,
                                      spell1Id: spell1Id,
                                      spell2Id: spell2Id,
                                      stats: stats,
                                      summonerName: summonerName,
                                      bannedChamp: bannedChamp
                                    });

                                  case 12:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x5) {
                            return _ref3.apply(this, arguments);
                          };
                        }()));

                      case 13:
                        participantInfoArr = _context2.sent;

                        /* Get boolean for whether user won the match */
                        didWin = participantInfoArr.find(function (ele) {
                          return ele.summonerName.toLowerCase() === summonerName.toLowerCase();
                        }).stats.win;
                        /* Create new match document */

                        newMatch = new _match["default"]({
                          matchId: matchId,
                          data: {
                            gameDuration: gameDuration,
                            description: description,
                            map: map,
                            matchParticipantInfo: participantInfoArr,
                            didWin: didWin,
                            timestamp: timestamp
                          }
                        });
                        _context2.next = 18;
                        return newMatch.save();

                      case 18:
                        return _context2.abrupt("return", newMatch.data);

                      case 21:
                        return _context2.abrupt("return", storedMatch.data);

                      case 22:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 18:
            matchDataArr = _context3.sent;
            _context3.next = 21;
            return (0, _utils.fetchHandler)("lol/league/v4/entries/by-summoner/".concat(id));

          case 21:
            summonerRanks = _context3.sent;
            ranks = summonerRanks.map(function (rankType) {
              var queueType = rankType.queueType,
                  tier = rankType.tier,
                  rank = rankType.rank,
                  leaguePoints = rankType.leaguePoints,
                  wins = rankType.wins,
                  losses = rankType.losses;
              return {
                queueType: queueType,
                tier: tier,
                rank: rank,
                leaguePoints: leaguePoints,
                wins: wins,
                losses: losses
              };
            });
            /* If there isn't a stored summoner, create one.  Else we update */

            if (storedSummoner) {
              _context3.next = 31;
              break;
            }

            newSummonerData = {
              name: name.toLowerCase(),
              data: {
                accountId: accountId,
                name: name,
                profileIconId: profileIconId,
                summonerLevel: summonerLevel,
                matches: matchDataArr,
                ranks: ranks
              },
              lastUpdated: new Date()
            };
            _context3.next = 27;
            return _summoner["default"].create(newSummonerData);

          case 27:
            newSummoner = _context3.sent;
            res.json(newSummoner.data);
            _context3.next = 36;
            break;

          case 31:
            storedSummoner.data = {
              accountId: accountId,
              id: id,
              name: name,
              profileIconId: profileIconId,
              summonerLevel: summonerLevel,
              matches: matchDataArr,
              ranks: ranks
            };
            storedSummoner.lastUpdated = new Date();
            _context3.next = 35;
            return storedSummoner.save();

          case 35:
            res.json(storedSummoner.data);

          case 36:
            _context3.next = 39;
            break;

          case 38:
            res.json(storedSummoner.data);

          case 39:
            _context3.next = 45;
            break;

          case 41:
            _context3.prev = 41;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            next(_context3.t0);

          case 45:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 41]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
var _default = router;
exports["default"] = _default;