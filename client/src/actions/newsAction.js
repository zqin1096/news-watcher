import axios from 'axios';
import {
    GET_ARTICLES, SET_LOADING
} from './types';

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const getArticles = (section) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            let res;
            if (section === undefined) {
                res = await axios.get('/api/guardian');
            } else {
                res = await axios.get(`/api/guardian/${section}`);
            }

            const payload = res.data.response.results ? res.data.response.results : [];
            dispatch({
                type: GET_ARTICLES,
                payload: payload
            });
        } catch (e) {

        }
    }
};