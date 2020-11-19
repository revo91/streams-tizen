import { SET_STREAMS_LIST, SELECT_STREAM, STREAMS_LIST_SYNC_ERROR, SET_STREAMS_PER_ROW, SET_STREAMS_LIST_PAGINATION } from '../actions/manageStreamsList';

const initialState = {
    streamsList: [],
    selectedStream: 0,
    syncError: false,
    streamsPerRow: 1,
    pagination: ''
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
        case SET_STREAMS_PER_ROW:
            return {
                ...state,
                streamsPerRow: action.num
            }
        case SET_STREAMS_LIST_PAGINATION:
            return {
                ...state,
                pagination: action.pagination
            }
        default:
            return state
    }
}