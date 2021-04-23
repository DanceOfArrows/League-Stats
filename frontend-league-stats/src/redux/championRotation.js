import { baseUrl } from './configureStore';

/* Types */
var LOAD_CHAMPION_ROTATION = 'leaguestats/freeRotation/LOAD_CHAMPION_ROTATION';

/* Action */
export const setChampionRotation = championRotation => ({ type: LOAD_CHAMPION_ROTATION, championRotation });

/* Fetch functions */
export const getChampionRotation = () => async dispatch => {
    const res = await fetch(`${baseUrl}/championRotation`);

    if (res.ok) {
        const championRotation = await res.json();
        dispatch(setChampionRotation(championRotation));
    };
};

/* Update state */
export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_CHAMPION_ROTATION: {
            return {
                ...state,
                championRotation: action.championRotation,
            };
        }
        default: return state;
    }
}