export const SET_POSSIBLE_QUALITIES = 'SET_POSSIBLE_QUALITIES';
export const SET_QUALITY = 'SET_QUALITY';
export const SET_QUALITY_SELECTOR_SHOWN = 'SET_QUALITY_SELECTOR_SHOWN';

export const setPossibleQualities = (qualities) => ({ type: SET_POSSIBLE_QUALITIES, qualities });
export const setQuality = (qualityName, qualityIndex, qualityGroup) => ({ type: SET_QUALITY, qualityName, qualityIndex, qualityGroup });
export const setQualitySelectorShown = (show) => ({ type: SET_QUALITY_SELECTOR_SHOWN, show})