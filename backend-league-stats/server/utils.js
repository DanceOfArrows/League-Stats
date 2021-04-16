import fetch from 'node-fetch';

import { riotKey } from './config';
import Champion from './models/champion.model';

/* Middleware to handle exceptions */
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

/* Error to throw when unable to find a champion by ID */
const missingChampionErr = (championId) => {
    const failedToFindErr = new Error(`Failed to find a champion with the id ${championId}`)
    failedToFindErr.status = 404;
    failedToFindErr.title = "Champion ID Convert Error";
    return failedToFindErr;
}

/* Convert championId(s) to championName(s) */
const convertChampionIds = async (championIds) => {
    try {
        /* Check if an array was sent to be converted then convert */
        if (Array.isArray(championIds)) {
            const champions = await Promise.all(
                championIds.map(async (championId) => {
                    const champion = await Champion.findOne({ championId }).lean();
                    if (!champion) throw missingChampionErr(championId);

                    const { championName, displayName } = champion;
                    return { championName, displayName };
                })
            );
            return champions;
        };

        /* Check if a single number sent to be converted then convert */
        if (typeof championIds === 'number') {
            const champion = await Champion.findOne({ championId: championIds }).lean();
            if (!champion) throw missingChampionErr(championIds);

            const { championName, displayName } = champion;
            return { championName, displayName };
        };
    } catch (e) {
        /* Catch any other errors that might occur */
        const convertErr = new Error(e.message);
        convertErr.status = 400;
        convertErr.title = "Champion ID Convert Error";
        throw convertErr;
    }
};

/* Fetch function to prevent repeating of headers */
const fetchHandler = async (path) => {
    const res = await fetch(`https://na1.api.riotgames.com/${path}`, {
        headers: { 'X-Riot-Token': riotKey }
    });
    const parsedRes = await res.json();

    if (res.ok) return parsedRes;
    else {
        const fetchErr = new Error(parsedRes.status.message);
        fetchErr.status = parsedRes.status.status_code;
        fetchErr.title = "Fetch from Riot API Error";
        throw fetchErr;
    };
};

/* Check if time is older than 2 minutes */
const timeCheck = (timeToCompare) => {
    return Date.parse(new Date()) >= (Date.parse(timeToCompare) + 120000);
};

export {
    asyncHandler,
    convertChampionIds,
    fetchHandler,
    timeCheck
};