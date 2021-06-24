import { baseUrl } from "./configureStore";

/* Types */
var LOAD_LEADERBOARD = "leaguestats/leaderboard/LOAD_LEADERBOARD";

/* Action */
export const setLeaderboard = (leaderboard) => ({
  type: LOAD_LEADERBOARD,
  leaderboard,
});

/* Fetch functions */
export const getLeaderboard = () => async (dispatch) => {
  const res = await fetch(`${baseUrl}/leaderboard`);

  if (res.ok) {
    const leaderboard = await res.json();

    dispatch(setLeaderboard(leaderboard));
  }
};

/* Update state */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_LEADERBOARD: {
      return {
        ...state,
        leaderboard: action.leaderboard,
      };
    }
    default:
      return state;
  }
}
