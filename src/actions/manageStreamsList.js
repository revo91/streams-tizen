export const SET_GAMES_LIST = "SET_GAMES_LIST";
export const SET_STREAMS_LIST = "SET_STREAMS_LIST";
export const SELECT_GAME = "SELECT_GAME";
export const SELECT_STREAM = "SELECT_STREAM";
export const setGamesList = (list) => ({ type: SET_GAMES_LIST, list});
export const setStreamsList = (list) => ({ type: SET_STREAMS_LIST, list});
export const selectGame = (index) => ({ type: SELECT_GAME, index });
export const selectStream = (index) => ({ type: SELECT_STREAM, index});

export const getGamesList = (url, gameID='') => {
    return dispatch => {
        callTwitchAPI(url, gameID).then(data=>{
            dispatch(setGamesList(data))
        })
    };
  };

  export const getStreamsList = (url, gameID='') => {
    return dispatch => {
        callTwitchAPI(url, gameID).then(data=>{
            dispatch(setStreamsList(data))
        })
    };
  };

  async function callTwitchAPI(url,params) {
    let parsedUrl = `${url}${params}`;
    let response = await fetch(parsedUrl, {
        method: 'GET',
        headers: {
            'Client-ID': <YOUR CLIENT ID - TO BE MADE IN DEV TWITCH ACCOUNT>
        }
    })
    let fetchedData = await response.json()
    return fetchedData.data
}
