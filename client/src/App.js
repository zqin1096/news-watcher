import React from 'react';
import './App.css';
import NavigationBar from './components/layout/NavigationBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Router>
            <NavigationBar/>
        </Router>
    );
}

export default App;
