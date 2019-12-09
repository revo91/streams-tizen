export const SET_GAMES_LIST = 'SET_GAMES_LIST';
export const SET_STREAMS_LIST = 'SET_STREAMS_LIST';
export const SELECT_GAME = 'SELECT_GAME';
export const SELECT_STREAM = 'SELECT_STREAM';
export const GAME_LIST_SYNC_ERROR = 'GAME_LIST_SYNC_ERROR';
export const STREAMS_LIST_SYNC_ERROR = 'STREAMS_LIST_SYNC_ERROR';
export const setGamesList = (list) => ({ type: SET_GAMES_LIST, list });
export const setStreamsList = (list) => ({ type: SET_STREAMS_LIST, list });
export const selectGame = (index) => ({ type: SELECT_GAME, index });
export const selectStream = (index) => ({ type: SELECT_STREAM, index });
export const gameListSyncError = (error) => ({ type: GAME_LIST_SYNC_ERROR, error })
export const streamsListSyncError = (error) => ({ type: STREAMS_LIST_SYNC_ERROR, error })

export const getGamesList = (url, gameID = '') => {
    return dispatch => {
        dispatch(gameListSyncError(false))
        callTwitchAPI(url, gameID).then(data => {
            dispatch(setGamesList(data))
        }).catch(() => {
            dispatch(gameListSyncError(true))
        })
    };
};

export const getStreamsList = (url, gameID = '') => {
    return dispatch => {
        dispatch(streamsListSyncError(false))
        callTwitchAPI(url, gameID).then(data => {
            dispatch(setStreamsList(data));
        }).catch(() => {
            dispatch(streamsListSyncError(true))
        })
    };
};

async function callTwitchAPI(url, params) {
    let parsedUrl = `${url}${params}`;
    let response = await fetch(parsedUrl, {
        method: 'GET',
        headers: {
            'Client-ID': 'an1u57pqifgc1lanxdq4rvng5u6cow'
        }
    })
    let fetchedData = await response.json()
    return fetchedData.data
}
