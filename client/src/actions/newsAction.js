import axios from 'axios';
import {
    GET_ARTICLES, SET_CHECKED, SET_LOADING
} from './types';

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

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

export const toggleSwitch = (isChecked) => {
    return {
        type: SET_CHECKED,
        payload: isChecked
    };
};