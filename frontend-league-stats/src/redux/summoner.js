import { baseUrl } from "./configureStore";

/* Types */
var LOAD_SUMMONER = "leaguestats/summoner/LOAD_SUMMONER";

/* Action */
export const setSummoner = (summoner) => ({ type: LOAD_SUMMONER, summoner });

/* Fetch functions */
export const getSummoner = (summonerName) => async (dispatch) => {
  const summonerNameEncoded = encodeURIComponent(summonerName);
  const res = await fetch(`${baseUrl}/summoner/${summonerNameEncoded}`);

  if (res.ok) {
    const summoner = await res.json();

    dispatch(setSummoner(summoner));
  }
};

/* Update state */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_SUMMONER: {
      return {
        ...state,
        summoners: {
          ...state.summoners,
          [action.summoner.name.toLowerCase()]: action.summoner,
        },
      };
    }
    default:
      return state;
  }
}
