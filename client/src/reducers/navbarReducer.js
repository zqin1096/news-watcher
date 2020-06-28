import {SET_SHOW_SWITCH} from '../actions/types';

const initialState = {
    showSwitch: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_SWITCH:
            return {
                ...state,
                showSwitch: action.payload
            };
        default:
            return state;
    }
};