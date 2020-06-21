import {GET_ARTICLES, SET_LOADING} from '../actions/types';

const initialState = {
    articles: [],
    article: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

