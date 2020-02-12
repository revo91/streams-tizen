import { SET_GAMES_LIST, SELECT_GAME, GAME_LIST_SYNC_ERROR, SET_GAMES_PER_ROW } from '../actions/manageStreamsList';

const initialState = {
    gamesList: [],
    selectedGame: 0,
    syncError: false,
    gamesPerRow: 1
}

export const gamesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES_LIST:
            return {
                ...state,
                gamesList: action.list
            }
        case SELECT_GAME:
            return {
                ...state,
                selectedGame: action.index
            }
        case GAME_LIST_SYNC_ERROR:
            return {
                ...state,
                syncError: action.error
            }
        case SET_GAMES_PER_ROW:
            return {
                ...state,
                gamesPerRow: action.num
            }
        default:
            return state
    }
}