import React from 'react';
import './App.css';
import NavigationBar from './components/layout/NavigationBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import Headlines from './components/headline/Headlines';
import Article from './components/article/Article';
import Results from './components/result/Results';
import Bookmarks from './components/bookmark/Bookmarks';
import {ToastContainer} from 'react-toastify';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route exact path="/:section?" component={Headlines}/>
                    <Route exact path="/:section/article" component={Article}/>
                    <Route exact path="/news/search" component={Results}/>
                    <Route exact path="/news/favorites" component={Bookmarks}/>
                </Switch>
            </Router>
            {/*Need to render the ToastContainer once in the application tree.*/}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </Provider>
    );
}

export default App;
