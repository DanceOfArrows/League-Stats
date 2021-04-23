import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import championRotation from './championRotation';
import leaderboard from './leaderboard';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    championRotation,
    leaderboard
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export const baseUrl = process.env.NODE_ENV === "production" ? '' : 'http://localhost:8080';
export default configureStore;