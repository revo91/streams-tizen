import { gamesListReducer } from './gamesListReducer';
import { SET_GAMES_LIST, SELECT_GAME, GAME_LIST_SYNC_ERROR } from '../actions/manageStreamsList';

describe('gamesListReducer', () => {

    const gamesListExample = [{
        id: "509658",
        name: "Just Chatting",
        box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-{width}x{height}.jpg"
    }, {
        id: "21779",
        name: "League of Legends",
        box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
    }]

    it('should return the initial state', () => {
        expect(gamesListReducer(undefined, {})).toEqual(
            {
                gamesList: [],
                selectedGame: 0,
                syncError: false
            }
        )
    })

    it('should handle SET_GAMES_LIST', () => {
        expect(
            gamesListReducer(undefined,
                {
                    type: SET_GAMES_LIST,
                    list: gamesListExample
                })
        ).toEqual(
            {
                gamesList: gamesListExample,
                selectedGame: 0,
                syncError: false
            }
        )

        expect(
            gamesListReducer(
                {
                    gamesList: [],
                    selectedGame: 0,
                    syncError: false
                },
                {
                    type: SET_GAMES_LIST,
                    list: gamesListExample
                }
            )
        ).toEqual(
            {
                gamesList: gamesListExample,
                selectedGame: 0,
                syncError: false
            },
            {
                gamesList: [],
                selectedGame: 0,
                syncError: false
            }
        )
    })

    it('should handle SELECT_GAME', () => {
        expect(
            gamesListReducer(undefined,
                {
                    type: SELECT_GAME,
                    index: 1
                })
        ).toEqual(
            {
                gamesList: [],
                selectedGame: 1,
                syncError: false
            }
        )

        expect(
            gamesListReducer(
                {
                    gamesList: [],
                    selectedGame: 0,
                    syncError: false
                },
                {
                    type: SELECT_GAME,
                    index: 1
                }
            )
        ).toEqual(
            {
                gamesList: [],
                selectedGame: 1,
                syncError: false
            },
            {
                gamesList: [],
                selectedGame: 0,
                syncError: false
            }
        )
    })

    it('should handle GAME_LIST_SYNC_ERROR', () => {
        expect(
            gamesListReducer(undefined,
                {
                    type: GAME_LIST_SYNC_ERROR,
                    error: true
                })
        ).toEqual(
            {
                gamesList: [],
                selectedGame: 0,
                syncError: true
            }
        )

        expect(
            gamesListReducer(
                {
                    gamesList: [],
                    selectedGame: 0,
                    syncError: false
                },
                {
                    type: GAME_LIST_SYNC_ERROR,
                    error: true
                }
            )
        ).toEqual(
            {
                gamesList: [],
                selectedGame: 0,
                syncError: true
            },
            {
                gamesList: [],
                selectedGame: 0,
                syncError: false
            }
        )
    })
})