import {
    ADD_BOOKMARK,
    REMOVE_BOOKMARK,
    SET_BOOKMARK_TAB
} from './types';

// Add an article to the bookmark.
export const addBookmark = (article) => {
    return {
        type: ADD_BOOKMARK,
        payload: article
    };
};

// Remove the article from the bookmark.
export const removeBookmark = (article) => {
    return {
        type: REMOVE_BOOKMARK,
        payload: article
    };
};

// Set if the bookmark page is being viewed.
export const setBookmarkTab = (isInBookmarkTab) => {
    return {
        type: SET_BOOKMARK_TAB,
        payload: isInBookmarkTab
    };
};