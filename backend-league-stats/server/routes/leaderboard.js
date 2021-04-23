import express from 'express';
import RiotData from '../models/riotData.model';

import {
    asyncHandler,
    fetchHandler,
    timeCheck
} from '../utils';

const router = express.Router();

/* Grab champion rotation data from Riot API */
router.get('/', asyncHandler(async (req, res) => {
    let storedLeaderboard = await RiotData.findOne({ type: 'leaderboard' });
    const isUpdateRequired = timeCheck(storedLeaderboard.lastUpdated);

    if (isUpdateRequired) {
        const challengerLeague = await fetchHandler('lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5/');
        const { entries } = challengerLeague;

        const updatedData = await Promise.all(entries.map(({
            summonerName,
            wins,
            losses,
            leaguePoints
        }) => {
            return {
                summonerName,
                wins,
                losses,
                leaguePoints
            };
        }));

        storedLeaderboard.data = updatedData;
        storedLeaderboard.lastUpdated = new Date();
        await storedLeaderboard.save();

        res.json(updatedData);
    } else {
        res.json(storedLeaderboard.data);
    }
}));

export default router;