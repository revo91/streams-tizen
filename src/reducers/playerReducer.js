import { SET_POSSIBLE_QUALITIES, SET_QUALITY, SET_QUALITY_SELECTOR_SHOWN } from '../actions/manageQuality';

const initialState = {
    qualities: [],
    selectedQuality: {
        name: 'Auto',
        index: 0,
        group: 'auto'
    },
    qualitySelectionShown: false
}

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSSIBLE_QUALITIES:
            return {
                ...state,
                qualities: action.qualities
            }
        case SET_QUALITY:
            return {
                ...state,
                selectedQuality: {
                    ...state.selectedQuality,
                    name: action.qualityName,
                    index: action.qualityIndex,
                    group: action.qualityGroup
                }
            }
        case SET_QUALITY_SELECTOR_SHOWN:
            return {
                ...state,
                qualitySelectionShown: action.show
            }
        default:
            return state
    }
}