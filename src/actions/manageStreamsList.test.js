import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { getGamesList, getStreamsList, GAME_LIST_SYNC_ERROR, SET_GAMES_LIST, STREAMS_LIST_SYNC_ERROR, SET_STREAMS_LIST } from './manageStreamsList';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('should create an action to get list of games from Twitch API', () => {
    fetchMock.getOnce('/twitchAPIgameslist', {
      data: [{
        id: "21779",
        name: "League of Legends",
        box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
      }],
      headers: { 'Client-ID': 'an1u57pqifgc1lanxdq4rvng5u6cow' }
    })
    const expectedActions = [
      { type: GAME_LIST_SYNC_ERROR, error: false },
      {
        type: SET_GAMES_LIST, list: [{
          id: "21779",
          name: "League of Legends",
          box_art_url: "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
        }]
      }
    ]
    const store = mockStore({})
    return store.dispatch(getGamesList('/twitchAPIgameslist')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create and action to get streams list of given game', () => {
    fetchMock.getOnce('/twitchAPIstreamslist', {
      data: [{
        id: "36714268224",
        user_id: "48946894",
        user_name: "NiteNightKid",
        game_id: "21779",
        type: "live"
      }],
      headers: { 'Client-ID': 'an1u57pqifgc1lanxdq4rvng5u6cow' }
    })
    const expectedActions = [
      { type: STREAMS_LIST_SYNC_ERROR, error: false },
      {
        type: SET_STREAMS_LIST, list: [{
          id: "36714268224",
          user_id: "48946894",
          user_name: "NiteNightKid",
          game_id: "21779",
          type: "live"
        }]
      }
    ]
    const store = mockStore({})
    return store.dispatch(getStreamsList('/twitchAPIstreamslist')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
