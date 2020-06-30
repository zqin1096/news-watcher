import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import navbarReducer from './navbarReducer';
import bookmarkReducer from './bookmarkReducer';

const rootReducer = combineReducers({
    news: newsReducer,
    navbar: navbarReducer,
    bookmark: bookmarkReducer
});
export default rootReducer;