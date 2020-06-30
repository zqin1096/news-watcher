import {
    ADD_BOOKMARK,
    REMOVE_BOOKMARK,
    SET_BOOKMARK_TAB
} from './types';

export const addBookmark = (article) => {
    return {
        type: ADD_BOOKMARK,
        payload: article
    };
};

export const removeBookmark = (article) => {
    return {
        type: REMOVE_BOOKMARK,
        payload: article
    };
};

export const setBookmarkTab = (isInBookmarkTab) => {
    return {
        type: SET_BOOKMARK_TAB,
        payload: isInBookmarkTab
    };
};