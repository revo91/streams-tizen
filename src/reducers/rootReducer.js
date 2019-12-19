import { combineReducers } from 'redux';
import { gamesListReducer } from './gamesListReducer';
import { streamsListReducer } from './streamsListReducer';
import { playerReducer } from './playerReducer';

export default combineReducers({
    gamesListReducer,
    streamsListReducer,
    playerReducer
})