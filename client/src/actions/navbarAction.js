import {SET_SHOW_SWITCH} from './types';

// The switch is not shown in the search page and detailed article page.
export const setShowSwitch = (isShowed) => {
    return {
        type: SET_SHOW_SWITCH,
        payload: isShowed
    };
};