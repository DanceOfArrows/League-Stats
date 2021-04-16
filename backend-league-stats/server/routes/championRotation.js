import express from 'express';
import RiotData from '../models/riotData.model';

import {
    asyncHandler,
    convertChampionIds,
    fetchHandler,
    timeCheck
} from '../utils';

const router = express.Router();

/* Grab champion rotation data from Riot API */
router.get('/', asyncHandler(async (req, res) => {
    let storedRotation = await RiotData.findOne({ type: 'championRotation' });
    const isUpdateRequired = timeCheck(storedRotation.lastUpdated);

    if (isUpdateRequired) {
        const championRotation = await fetchHandler('lol/platform/v3/champion-rotations/');
        const { freeChampionIds, freeChampionIdsForNewPlayers, maxNewPlayerLevel } = championRotation;

        const freeChampionNames = await convertChampionIds(freeChampionIds);
        const freeChampionNamesForNewPlayers = await convertChampionIds(freeChampionIdsForNewPlayers);

        const updatedData = {
            freeChampionNames,
            freeChampionNamesForNewPlayers,
            maxNewPlayerLevel
        };

        storedRotation.data = updatedData;
        storedRotation.lastUpdated = new Date();
        await storedRotation.save();

        res.json(updatedData);
    } else {
        res.json(storedRotation.data);
    }
}));

export default router;