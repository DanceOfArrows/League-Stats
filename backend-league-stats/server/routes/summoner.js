import express from "express";

import Match from "../models/match.model";
import Summoner from "../models/summoner.model";
import {
  asyncHandler,
  convertChampionIds,
  fetchHandler,
  queueIdInfo,
  timeCheck,
} from "../utils";

const router = express.Router();

/* Grab summoner data from Riot API */
router.get(
  "/:summonerName",
  asyncHandler(async (req, res, next) => {
    try {
      const { summonerName } = req.params;
      let storedSummoner = await Summoner.findOne({ name: summonerName });
      const isUpdateRequired = storedSummoner
        ? timeCheck(storedSummoner.lastUpdated)
        : true;

      if (isUpdateRequired) {
        /* Get summoner data using their name */
        const summonerData = await fetchHandler(
          `lol/summoner/v4/summoners/by-name/${summonerName}`
        );
        const { accountId, name, profileIconId, puuid, summonerLevel } =
          summonerData;

        /* Gets 10 recent matches.  This is due to API limitations (can go to 100, but rate limited to 20 per 1 sec and 100 per 2 min) */
        const summonerMatches = await fetchHandler(
          `lol/match/v4/matchlists/by-account/${accountId}?beginIndex=0&endIndex=10`
        );
        const { matches } = summonerMatches;
        /* Get match data for user */
        const matchDataArr = await Promise.all(
          matches.map(async (match) => {
            const { gameId: matchId, timestamp } = match;

            /* Check if a match is stored */
            const storedMatch = await Match.findOne({ matchId });

            /* Fetch match from Riot API and format */
            if (!storedMatch) {
              const matchData = await fetchHandler(
                `lol/match/v4/matches/${matchId}`
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
              const bansFormatted =
                bans.length > 0 ? bans.map((ban) => ban.championId) : [];
              const bansUnique =
                bans.length > 0
                  ? convertChampionIds([...new Set(bansFormatted)])
                  : [];

              /* Gets relevant match data and summoner name of each player */
              const participantInfoArr = participants.map((participant) => {
                const { participantId, championId, spell1Id, spell2Id, stats } =
                  participant;
                const {
                  player: { summonerName },
                } = participantIdentities.find(
                  (ele) => ele.participantId === participantId
                );

                return { championId, spell1Id, spell2Id, stats, summonerName };
              });

              /* Get boolean for whether user won the match */
              const didWin = participantInfoArr.find(
                (ele) => ele.summonerName === summonerName
              ).stats.win;

              /* Create new match document */
              const newMatch = new Match({
                matchId,
                data: {
                  gameDuration,
                  description,
                  map,
                  bansUnique,
                  matchParticipantInfo: participantInfoArr,
                  didWin,
                },
              });
              await newMatch.save();

              return newMatch.data;
            } else {
              return storedMatch.data;
            }
          })
        );

        /* If there isn't a stored summoner, create one.  Else we update */
        if (!storedSummoner) {
          const newSummoner = new Summoner({
            name: summonerName,
            data: {
              accountId,
              name,
              profileIconId,
              puuid,
              summonerLevel,
              matches: matchDataArr,
            },
            lastUpdated: new Date(),
          });
          await newSummoner.save();

          res.json(newSummoner.data);
        } else {
          storedSummoner.data = {
            accountId,
            name,
            profileIconId,
            puuid,
            summonerLevel,
            matches: matchDataArr,
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
