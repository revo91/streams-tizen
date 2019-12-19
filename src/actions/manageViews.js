export const SET_APP_CURRENT_VIEW = 'SET_APP_CURRENT_VIEW';
export const SET_APP_CURRENT_GAME = 'SET_APP_CURRENT_GAME';

export const setAppCurrentView = (view) => ({ type: SET_APP_CURRENT_VIEW, view })
export const setAppCurrentGame = (game) => ({ type: SET_APP_CURRENT_GAME, game })