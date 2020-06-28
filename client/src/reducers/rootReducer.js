import {combineReducers} from 'redux';
import newsReducer from './newsReducer';
import navbarReducer from './navbarReducer';

const rootReducer = combineReducers({
    news: newsReducer,
    navbar: navbarReducer
});
export default rootReducer;