import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import MainView from "./views/MainView";

class App extends Component {

    render() {
        return (
            /*
            I've implemented react-router for the sole reason of not wanting to do everything in App.js + presenting my knowledge of react-router
            */
            <Router>
                    <Switch>
                        <Route exact path="/">
                            <MainView />
                        </Route>
                    </Switch>
            </Router>
        );
    }
}

export default App;
