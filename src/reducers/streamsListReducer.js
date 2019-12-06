import { SET_STREAMS_LIST, SELECT_STREAM } from '../actions/manageStreamsList';

const initialState = {
    streamsList: [],
    selectedStream: 0
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
        default:
            return state
    }
}