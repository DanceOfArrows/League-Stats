import { baseUrl } from "./configureStore";

/* Types */
var LOAD_SUMMONER = "leaguestats/summoner/LOAD_SUMMONER";

/* Action */
export const setSummoner = (summoner) => ({ type: LOAD_SUMMONER, summoner });

/* Fetch functions */
export const getSummoner = (summonerName) => async (dispatch) => {
  const summonerNameDecoded = decodeURI(summonerName);
  const res = await fetch(`${baseUrl}/summoner/${summonerNameDecoded}`);

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
        [action.summoner.name]: action.summoner,
      };
    }
    default:
      return state;
  }
}
