import { clientID, clientSecret } from '../config';
export const SET_GAMES_LIST = 'SET_GAMES_LIST';
export const SET_STREAMS_LIST = 'SET_STREAMS_LIST';
export const SELECT_GAME = 'SELECT_GAME';
export const SELECT_STREAM = 'SELECT_STREAM';
export const GAME_LIST_SYNC_ERROR = 'GAME_LIST_SYNC_ERROR';
export const STREAMS_LIST_SYNC_ERROR = 'STREAMS_LIST_SYNC_ERROR';
export const SET_GAMES_PER_ROW = 'SET_GAMES_PER_ROW';
export const SET_STREAMS_PER_ROW = 'SET_STREAMS_PER_ROW';
export const setGamesList = (list) => ({ type: SET_GAMES_LIST, list });
export const setStreamsList = (list) => ({ type: SET_STREAMS_LIST, list });
export const selectGame = (index) => ({ type: SELECT_GAME, index });
export const selectStream = (index) => ({ type: SELECT_STREAM, index });
export const gameListSyncError = (error) => ({ type: GAME_LIST_SYNC_ERROR, error })
export const streamsListSyncError = (error) => ({ type: STREAMS_LIST_SYNC_ERROR, error })
export const setGamesPerRow = (num) => ({ type: SET_GAMES_PER_ROW, num })
export const setStreamsPerRow = (num) => ({ type: SET_STREAMS_PER_ROW, num })

let accessToken = ''

export const getGamesList = (url, token = accessToken) => {
    return async dispatch => {
        dispatch(gameListSyncError(false))
        let response = await fetch(url, {
            headers: {
                'Client-ID': clientID,
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            token = await refreshToken()
            response = await fetch(url, {
                headers: {
                    'Client-ID': clientID,
                    'Authorization': `Bearer ${token}`
                }
            })
            let fetchedData = await response.json()
            dispatch(setGamesList(fetchedData.data))
        }
        else if (response.status !== 200) {
            dispatch(gameListSyncError(true))
        }
        else {
            let fetchedData = await response.json()
            dispatch(setGamesList(fetchedData.data))
        }
    };
};

export const getStreamsList = (url, gameID = '', token = accessToken) => {
    return async dispatch => {
        dispatch(streamsListSyncError(false))
        let response = await fetch(`${url}${gameID}`, {
            headers: {
                'Client-ID': clientID,
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            token = await refreshToken()
            response = await fetch(`${url}${gameID}`, {
                headers: {
                    'Client-ID': clientID,
                    'Authorization': `Bearer ${token}`
                }
            })
            let fetchedData = await response.json()
            dispatch(setStreamsList(fetchedData.data))
        }
        else if (response.status !== 200) {
            dispatch(streamsListSyncError(true))
        }
        else {
            let fetchedData = await response.json()
            dispatch(setStreamsList(fetchedData.data));
        }
    };
};

const refreshToken = async () => {
    const data = {
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
    }

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const fetchedData = await response.json()
    accessToken = fetchedData.access_token
    return fetchedData.access_token

}