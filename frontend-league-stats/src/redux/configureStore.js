import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import championRotation from "./championRotation";
import leaderboard from "./leaderboard";
import summoner from "./summoner";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  championRotation,
  leaderboard,
  summoner,
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export const baseUrl =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? "https://league-stats-back.herokuapp.com"
    : "https://ef3e6cfa11f7.ngrok.io";
export default configureStore;
