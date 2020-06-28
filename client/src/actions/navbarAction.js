import {SET_SHOW_SWITCH} from './types';

export const setShowSwitch = (isShowed) => {
    return {
        type: SET_SHOW_SWITCH,
        payload: isShowed
    }
};