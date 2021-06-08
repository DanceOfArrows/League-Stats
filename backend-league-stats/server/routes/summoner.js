import express from "express";

import Match from "../models/match.model";
import Summoner from "../models/summoner.model";
import {
  asyncHandler,
  convertChampionIds,
  fetchHandler,
  queueIdInfo,
  summonerIdNameObj,
  timeCheck,
} from "../utils";

const router = express.Router();

/* Grab summoner data from Riot API */
router.get(
  "/:summonerName",
  asyncHandler(async (req, res, next) => {
    try {
      const { summonerName } = req.params;
      const summonerNameEncoded = encodeURIComponent(summonerName);
      const summonerData = await fetchHandler(
        `lol/summoner/v4/summoners/by-name/${summonerNameEncoded}`
      );
      const nameToUse = summonerData.name;
      let storedSummoner = await Summoner.findOne({
        name: nameToUse.toLowerCase(),
      });
      const isUpdateRequired = storedSummoner
        ? timeCheck(storedSummoner.lastUpdated)
        : true;

      if (isUpdateRequired) {
        /* Get summoner data using their name */
        const { accountId, id, profileIconId, summonerLevel } = summonerData;

        /* Gets 10 recent matches.  This is due to API limitations (can go to 100, but rate limited to 20 per 1 sec and 100 per 2 min) */
        const summonerMatches = await fetchHandler(
          `lol/match/v4/matchlists/by-account/${accountId}?beginIndex=0&endIndex=10`
        ).catch((e) => console.log(e));
        let matchDataArr;
        if (summonerMatches) {
          const { matches } = summonerMatches;

          /* Get match data for summoner */
          matchDataArr = await Promise.all(
            matches.map(async (match) => {
              const { gameId: matchId, timestamp } = match;

              /* Check if a match is stored */
              const storedMatch = await Match.findOne({ matchId });

              /* Fetch match from Riot API and format */
              if (!storedMatch) {
                const matchData = await fetchHandler(
                  `lol/match/v4/matches/${matchId}`
                  //true
                );

                const {
                  gameDuration,
                  participants,
                  participantIdentities,
                  queueId,
                  teams,
                } = matchData;
                /* Get info for the queueId */
                const { description, map } = queueIdInfo.find(
                  (ele) => ele.queueId === queueId
                );

                /* Get bans and filter to make unique -> converts ids into names */
                const bans =
                  teams[0].bans.length > 0 && teams[1].bans.length > 0
                    ? [...teams[0].bans, ...teams[1].bans]
                    : [];

                /* Gets relevant match data and summoner name of each player */
                const participantInfoArr = await Promise.all(
                  participants.map(async (participant) => {
                    const {
                      participantId,
                      championId,
                      spell1Id,
                      spell2Id,
                      stats,
                      teamId,
                      timeline,
                    } = participant;
                    const {
                      player: { summonerName },
                    } = participantIdentities.find(
                      (ele) => ele.participantId === participantId
                    );

                    const ban =
                      bans.length > 0
                        ? bans.find((ele) => ele.pickTurn === participantId)
                        : null;
                    const bannedChamp =
                      ban != null
                        ? await convertChampionIds(ban.championId)
                        : null;
                    const champion = await convertChampionIds(championId);

                    return {
                      champion,
                      spell1: summonerIdNameObj[spell1Id],
                      spell2: summonerIdNameObj[spell2Id],
                      stats,
                      summonerName,
                      teamId,
                      bannedChamp,
                      role: timeline.role,
                      lane: timeline.lane,
                    };
                  })
                );

                /* Get boolean for whether user won the match */
                const didWin = participantInfoArr.find((ele) => {
                  return (
                    ele.summonerName.toLowerCase() === nameToUse.toLowerCase()
                  );
                }).stats.win;

                /* Create new match document */
                const newMatch = new Match({
                  matchId,
                  data: {
                    gameDuration,
                    description,
                    map,
                    matchParticipantInfo: participantInfoArr,
                    didWin,
                    timestamp,
                  },
                });
                await newMatch.save();

                return newMatch.data;
              } else {
                return storedMatch.data;
              }
            })
          );
        }

        /* Get rank for summoner */
        const summonerRanks = await fetchHandler(
          `lol/league/v4/entries/by-summoner/${id}`
        );
        const ranks = summonerRanks.map((rankType) => {
          const { queueType, tier, rank, leaguePoints, wins, losses } =
            rankType;

          return {
            queueType,
            tier,
            rank,
            leaguePoints,
            wins,
            losses,
          };
        });

        /* If there isn't a stored summoner, create one.  Else we update */
        if (!storedSummoner) {
          const newSummonerData = {
            name: nameToUse.toLowerCase(),
            data: {
              name: nameToUse,
              profileIconId,
              summonerLevel,
              matches: matchDataArr,
              ranks,
            },
            lastUpdated: new Date(),
          };
          const newSummoner = await Summoner.create(newSummonerData);

          res.json(newSummoner.data);
        } else {
          storedSummoner.data = {
            name: nameToUse,
            profileIconId,
            summonerLevel,
            matches: matchDataArr,
            ranks,
          };
          storedSummoner.lastUpdated = new Date();
          await storedSummoner.save();

          res.json(storedSummoner.data);
        }
      } else {
        res.json(storedSummoner.data);
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  })
);

export default router;
