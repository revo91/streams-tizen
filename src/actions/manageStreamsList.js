export const SET_GAMES_LIST = 'SET_GAMES_LIST';
export const SET_STREAMS_LIST = 'SET_STREAMS_LIST';
export const SELECT_GAME = 'SELECT_GAME';
export const SELECT_STREAM = 'SELECT_STREAM';
export const GAME_LIST_SYNC_ERROR = 'GAME_LIST_SYNC_ERROR';
export const STREAMS_LIST_SYNC_ERROR = 'STREAMS_LIST_SYNC_ERROR';
export const SET_GAMES_PER_ROW = 'SET_GAMES_PER_ROW';
export const SET_STREAMS_PER_ROW = 'SET_STREAMS_PER_ROW';
export const SET_GAMES_LIST_PAGINATION = 'SET_GAMES_LIST_PAGINATION';
export const SET_STREAMS_LIST_PAGINATION = 'SET_STREAMS_LIST_PAGINATION';

export const setGamesList = (list) => ({ type: SET_GAMES_LIST, list });
export const setStreamsList = (list) => ({ type: SET_STREAMS_LIST, list });
export const selectGame = (index) => ({ type: SELECT_GAME, index });
export const selectStream = (index) => ({ type: SELECT_STREAM, index });
export const gameListSyncError = (error) => ({ type: GAME_LIST_SYNC_ERROR, error })
export const streamsListSyncError = (error) => ({ type: STREAMS_LIST_SYNC_ERROR, error })
export const setGamesPerRow = (num) => ({ type: SET_GAMES_PER_ROW, num })
export const setStreamsPerRow = (num) => ({ type: SET_STREAMS_PER_ROW, num })
export const setGamesListPagination = (pagination) => ({ type: SET_GAMES_LIST_PAGINATION, pagination })
export const setStreamsListPagination = (pagination) => ({ type: SET_STREAMS_LIST_PAGINATION, pagination })