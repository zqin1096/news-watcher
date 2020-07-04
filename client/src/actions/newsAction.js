import axios from 'axios';
import {
    GET_ARTICLES,
    GET_ARTICLE,
    SET_CHECKED,
    SET_LOADING,
    SEARCH_ARTICLES
} from './types';

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

// Get Nytimes or Guardian news depending on the value of switch.
export const getArticle = (id, isChecked) => {
    return async (dispatch) => {
        const config = {
            params: {
                id: id
            }
        };
        try {
            dispatch(setLoading());
            let res;
            if (isChecked) {
                res = await axios.get('/api/guardian/article/content', config);
            } else {
                res = await axios.get('/api/nytimes/article/content', config);
            }
            dispatch({
                type: GET_ARTICLE,
                payload: res.data
            });
        } catch (e) {

        }
    };
};

// Get 10 articles of the specified section.
export const getArticles = (section, isChecked) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            let res;
            if (isChecked) {
                if (section === undefined) {
                    res = await axios.get('/api/guardian');
                } else {
                    if (section === 'sports') {
                        section = 'sport';
                    }
                    res = await axios.get(`/api/guardian/${section}`);
                }
            } else {
                if (section === undefined) {
                    res = await axios.get('/api/nytimes');
                } else {
                    res = await axios.get(`/api/nytimes/${section}`);
                }
            }
            const payload = res.data;
            dispatch({
                type: GET_ARTICLES,
                payload: payload
            });
        } catch (e) {

        }
    };
};

// Search articles depending on the keyword.
export const searchArticles = (keyword) => {
    return async (dispatch) => {
        const config = {
            params: {
                keyword: keyword
            }
        };
        try {
            dispatch(setLoading());
            const guardianNews = await axios.get('/api/search/guardian', config);
            const nytimesNews = await axios.get('/api/search/nytimes', config);
            const payload = guardianNews.data.concat(nytimesNews.data);
            dispatch({
                type: SEARCH_ARTICLES,
                payload: payload
            })
        } catch (e) {

        }
    };
};

export const toggleSwitch = (isChecked) => {
    return {
        type: SET_CHECKED,
        payload: isChecked
    };
};