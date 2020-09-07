import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import MainView from "./views/MainView";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
