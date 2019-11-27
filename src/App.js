import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from './Components/Home'
import Cities from './Components/Cities'

import './Styles/_app.scss';

class App extends React.Component {
  render() { 
    return (
      <div className="app">
      
      <Router>
        <Switch>
          <Route exact path={`/`} 
            render={ props => (
              <Home />
          )}/>
          <Route path={`/cities`}
            render={ props => (
              <Cities />
          )}/>
        </Switch>
      </Router>
    </div>
    );
  }
}
 
export default App;