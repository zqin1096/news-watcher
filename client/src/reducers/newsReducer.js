import {
    GET_ARTICLE,
    GET_ARTICLES,
    SET_CHECKED,
    SET_LOADING
} from '../actions/types';

const initialState = {
    articles: [],
    article: null,
    isChecked: true,
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
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload,
                loading: false
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            };
        case SET_CHECKED:
            return {
                ...state,
                isChecked: action.payload
            }
        default:
            return state;
    }
};

