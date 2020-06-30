import {
    ADD_BOOKMARK,
    REMOVE_BOOKMARK,
    SET_BOOKMARK_TAB
} from '../actions/types';

const initialState = {
    isInBookmarkTab: false,
    favorites: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOKMARK:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case REMOVE_BOOKMARK:
            return {
                ...state,
                favorites: state.favorites.filter((favorite) => {
                    return favorite.share !== action.payload.share;
                })
            };
        case SET_BOOKMARK_TAB:
            return {
                ...state,
                isInBookmarkTab: action.payload
            };
        default:
            return state;
    }
};