import { combineReducers } from "redux";
import { gamesListReducer } from "./gamesListReducer";
import { streamsListReducer } from "./streamsListReducer";

export default combineReducers({
    gamesListReducer,
    streamsListReducer
})