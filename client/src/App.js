import React from 'react';
import './App.css';
import NavigationBar from './components/layout/NavigationBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import Headlines from './components/headline/Headlines';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route exact path="/:section?" component={Headlines}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
