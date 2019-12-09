import { SET_STREAMS_LIST, SELECT_STREAM, STREAMS_LIST_SYNC_ERROR } from '../actions/manageStreamsList';

const initialState = {
    streamsList: [],
    selectedStream: 0,
    syncError: false
}

export const streamsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STREAMS_LIST:
            return {
                ...state,
                streamsList: action.list
            }
        case SELECT_STREAM:
            return {
                ...state,
                selectedStream: action.index
            }
        case STREAMS_LIST_SYNC_ERROR:
            return {
                ...state,
                syncError: action.error
            }
        default:
            return state
    }
}