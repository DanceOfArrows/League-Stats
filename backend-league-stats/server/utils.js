import fetch from "node-fetch";

import { riotKey } from "./config";
import Champion from "./models/champion.model";

const queueIdInfo = [
  {
    queueId: 0,
    map: "Custom",
    description: null,
  },
  {
    queueId: 2,
    map: "Summoner's Rift",
    description: "5v5 Blind Pick",
  },
  {
    queueId: 4,
    map: "Summoner's Rift",
    description: "5v5 Ranked Solo",
  },
  {
    queueId: 6,
    map: "Summoner's Rift",
    description: "5v5 Ranked Premade",
  },
  {
    queueId: 7,
    map: "Summoner's Rift",
    description: "Co-op vs AI",
  },
  {
    queueId: 8,
    map: "Twisted Treeline",
    description: "3v3 Normal",
  },
  {
    queueId: 9,
    map: "Twisted Treeline",
    description: "3v3 Ranked Flex",
  },
  {
    queueId: 14,
    map: "Summoner's Rift",
    description: "5v5 Draft Pick",
  },
  {
    queueId: 16,
    map: "Crystal Scar",
    description: "5v5 Dominion Blind Pick",
  },
  {
    queueId: 17,
    map: "Crystal Scar",
    description: "5v5 Dominion Draft Pick",
  },
  {
    queueId: 25,
    map: "Crystal Scar",
    description: "Dominion Co-op vs AI",
  },
  {
    queueId: 31,
    map: "Summoner's Rift",
    description: "Co-op vs AI Intro Bot",
  },
  {
    queueId: 32,
    map: "Summoner's Rift",
    description: "Co-op vs AI Beginner Bot",
  },
  {
    queueId: 33,
    map: "Summoner's Rift",
    description: "Co-op vs AI Intermediate Bot",
  },
  {
    queueId: 41,
    map: "Twisted Treeline",
    description: "3v3 Ranked Team",
  },
  {
    queueId: 42,
    map: "Summoner's Rift",
    description: "5v5 Ranked Team",
  },
  {
    queueId: 52,
    map: "Twisted Treeline",
    description: "Co-op vs AI",
  },
  {
    queueId: 61,
    map: "Summoner's Rift",
    description: "5v5 Team Builder",
  },
  {
    queueId: 65,
    map: "Howling Abyss",
    description: "5v5 ARAM",
  },
  {
    queueId: 67,
    map: "Howling Abyss",
    description: "ARAM Co-op vs AI",
  },
  {
    queueId: 70,
    map: "Summoner's Rift",
    description: "One for All",
  },
  {
    queueId: 72,
    map: "Howling Abyss",
    description: "1v1 Snowdown Showdown",
  },
  {
    queueId: 73,
    map: "Howling Abyss",
    description: "2v2 Snowdown Showdown",
  },
  {
    queueId: 75,
    map: "Summoner's Rift",
    description: "6v6 Hexakill",
  },
  {
    queueId: 76,
    map: "Summoner's Rift",
    description: "Ultra Rapid Fire",
  },
  {
    queueId: 78,
    map: "Howling Abyss",
    description: "One For All: Mirror Mode",
  },
  {
    queueId: 83,
    map: "Summoner's Rift",
    description: "Co-op vs AI Ultra Rapid Fire",
  },
  {
    queueId: 91,
    map: "Summoner's Rift",
    description: "Doom Bots Rank 1",
  },
  {
    queueId: 92,
    map: "Summoner's Rift",
    description: "Doom Bots Rank 2",
  },
  {
    queueId: 93,
    map: "Summoner's Rift",
    description: "Doom Bots Rank 5",
  },
  {
    queueId: 96,
    map: "Crystal Scar",
    description: "Ascension",
  },
  {
    queueId: 98,
    map: "Twisted Treeline",
    description: "6v6 Hexakill",
  },
  {
    queueId: 100,
    map: "Butcher's Bridge",
    description: "5v5 ARAM",
  },
  {
    queueId: 300,
    map: "Howling Abyss",
    description: "Legend of the Poro King",
  },
  {
    queueId: 310,
    map: "Summoner's Rift",
    description: "Nemesis",
  },
  {
    queueId: 313,
    map: "Summoner's Rift",
    description: "Black Market Brawlers",
  },
  {
    queueId: 315,
    map: "Summoner's Rift",
    description: "Nexus Siege",
  },
  {
    queueId: 317,
    map: "Crystal Scar",
    description: "Definitely Not Dominion",
  },
  {
    queueId: 318,
    map: "Summoner's Rift",
    description: "ARURF",
  },
  {
    queueId: 325,
    map: "Summoner's Rift",
    description: "All Random",
  },
  {
    queueId: 400,
    map: "Summoner's Rift",
    description: "5v5 Draft Pick",
  },
  {
    queueId: 410,
    map: "Summoner's Rift",
    description: "5v5 Ranked Dynamic",
  },
  {
    queueId: 420,
    map: "Summoner's Rift",
    description: "5v5 Ranked Solo",
  },
  {
    queueId: 430,
    map: "Summoner's Rift",
    description: "5v5 Blind Pick",
  },
  {
    queueId: 440,
    map: "Summoner's Rift",
    description: "5v5 Ranked Flex",
  },
  {
    queueId: 450,
    map: "Howling Abyss",
    description: "5v5 ARAM",
  },
  {
    queueId: 460,
    map: "Twisted Treeline",
    description: "3v3 Blind Pick",
  },
  {
    queueId: 470,
    map: "Twisted Treeline",
    description: "3v3 Ranked Flex",
  },
  {
    queueId: 600,
    map: "Summoner's Rift",
    description: "Blood Hunt Assassin",
  },
  {
    queueId: 610,
    map: "Cosmic Ruins",
    description: "Dark Star: Singularity",
  },
  {
    queueId: 700,
    map: "Summoner's Rift",
    description: "Clash",
  },
  {
    queueId: 800,
    map: "Twisted Treeline",
    description: "Co-op vs. AI Intermediate Bot",
  },
  {
    queueId: 810,
    map: "Twisted Treeline",
    description: "Co-op vs. AI Intro Bot",
  },
  {
    queueId: 820,
    map: "Twisted Treeline",
    description: "Co-op vs. AI Beginner Bot",
  },
  {
    queueId: 830,
    map: "Summoner's Rift",
    description: "Co-op vs. AI Intro Bot",
  },
  {
    queueId: 840,
    map: "Summoner's Rift",
    description: "Co-op vs. AI Beginner Bot",
  },
  {
    queueId: 850,
    map: "Summoner's Rift",
    description: "Co-op vs. AI Intermediate Bot",
  },
  {
    queueId: 900,
    map: "Summoner's Rift",
    description: "URF",
  },
  {
    queueId: 910,
    map: "Crystal Scar",
    description: "Ascension",
  },
  {
    queueId: 920,
    map: "Howling Abyss",
    description: "Legend of the Poro King",
  },
  {
    queueId: 940,
    map: "Summoner's Rift",
    description: "Nexus Siege",
  },
  {
    queueId: 950,
    map: "Summoner's Rift",
    description: "Doom Bots Voting",
  },
  {
    queueId: 960,
    map: "Summoner's Rift",
    description: "Doom Bots Standard",
  },
  {
    queueId: 980,
    map: "Valoran City Park",
    description: "Star Guardian Invasion: Normal",
  },
  {
    queueId: 990,
    map: "Valoran City Park",
    description: "Star Guardian Invasion: Onslaught",
  },
  {
    queueId: 1000,
    map: "Overcharge",
    description: "PROJECT: Hunters",
  },
  {
    queueId: 1010,
    map: "Summoner's Rift",
    description: "Snow ARURF",
  },
  {
    queueId: 1020,
    map: "Summoner's Rift",
    description: "One for All",
  },
  {
    queueId: 1030,
    map: "Crash Site",
    description: "Odyssey Extraction: Intro",
  },
  {
    queueId: 1040,
    map: "Crash Site",
    description: "Odyssey Extraction: Cadet",
  },
  {
    queueId: 1050,
    map: "Crash Site",
    description: "Odyssey Extraction: Crewmember",
  },
  {
    queueId: 1060,
    map: "Crash Site",
    description: "Odyssey Extraction: Captain",
  },
  {
    queueId: 1070,
    map: "Crash Site",
    description: "Odyssey Extraction: Onslaught",
  },
  {
    queueId: 1090,
    map: "Convergence",
    description: "Teamfight Tactics",
  },
  {
    queueId: 1100,
    map: "Convergence",
    description: "Ranked Teamfight Tactics",
  },
  {
    queueId: 1110,
    map: "Convergence",
    description: "Teamfight Tactics Tutorial",
  },
  {
    queueId: 1111,
    map: "Convergence",
    description: "Teamfight Tactics test",
  },
  {
    queueId: 1200,
    map: "Nexus Blitz",
    description: "Nexus Blitz",
  },
  {
    queueId: 1300,
    map: "Nexus Blitz",
    description: "Nexus Blitz",
  },
  {
    queueId: 2000,
    map: "Summoner's Rift",
    description: "Tutorial 1",
  },
  {
    queueId: 2010,
    map: "Summoner's Rift",
    description: "Tutorial 2",
  },
  {
    queueId: 2020,
    map: "Summoner's Rift",
    description: "Tutorial 3",
  },
  {
    queueId: 1400,
    map: "Summoner's Rift",
    description: "Ultimate Spellbook",
  },
];

/* Middleware to handle exceptions */
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

/* Error to throw when unable to find a champion by ID */
const missingChampionErr = (championId) => {
  const failedToFindErr = new Error(
    `Failed to find a champion with the id ${championId}`
  );
  failedToFindErr.status = 404;
  failedToFindErr.title = "Champion ID Convert Error";
  return failedToFindErr;
};

/* Convert championId(s) to championName(s) */
const convertChampionIds = async (championIds) => {
  if (championIds === -1) return { championName: null, displayName: null };
  try {
    /* Check if an array was sent to be converted then convert */
    if (Array.isArray(championIds)) {
      const champions = await Promise.all(
        championIds.map(async (championId) => {
          if (championId === -1)
            return { championName: null, displayName: null };
          const champion = await Champion.findOne({ championId }).lean();
          if (!champion) throw missingChampionErr(championId);

          const { championName, displayName } = champion;
          return { championName, displayName };
        })
      );
      return champions;
    }

    /* Check if a single number sent to be converted then convert */
    if (typeof championIds === "number") {
      const champion = await Champion.findOne({
        championId: championIds,
      }).lean();
      if (!champion) throw missingChampionErr(championIds);

      const { championName, displayName } = champion;
      return { championName, displayName };
    }
  } catch (e) {
    /* Catch any other errors that might occur */
    const convertErr = new Error(e.message);
    convertErr.status = 400;
    convertErr.title = "Champion ID Convert Error";
    throw convertErr;
  }
};

/* Convert Summoner IDs to name */
const summonerIdNameObj = {
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
  12: "SummonerTeleport",
};

/* Fetch function to prevent repeating of headers */
const fetchHandler = async (path, isRegionRoute) => {
  const res = !isRegionRoute
    ? await fetch(`https://na1.api.riotgames.com/${path}`, {
        headers: { "X-Riot-Token": riotKey },
      })
    : await fetch(`https://americas.api.riotgames.com/${path}`, {
        headers: { "X-Riot-Token": riotKey },
      });
  const parsedRes = await res.json();

  if (res.ok) return parsedRes;
  else {
    const fetchErr = new Error(parsedRes.status.message);
    fetchErr.status = parsedRes.status.status_code;
    fetchErr.title = "Fetch from Riot API Error";
    throw fetchErr;
  }
};

/* Check if time is older than 2 minutes */
const timeCheck = (timeToCompare) => {
  return Date.parse(new Date()) >= Date.parse(timeToCompare) + 120000;
};

export {
  asyncHandler,
  convertChampionIds,
  fetchHandler,
  queueIdInfo,
  summonerIdNameObj,
  timeCheck,
};
