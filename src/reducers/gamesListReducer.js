import { SET_GAMES_LIST, SELECT_GAME } from '../actions/manageStreamsList';

const initialState = {
    gamesList: [],
    selectedGame: 0
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
        default:
            return state
    }
}