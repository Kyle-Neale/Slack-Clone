import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Team from './Team';

const history = createBrowserHistory();

const Pages = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={(routerProps) => <Home {...routerProps} />}/>
        <Route path="/register" exact render={(routerProps) => <Register {...routerProps} />}/>
        <Route path="/login" exact render={(routerProps) => <Login {...routerProps} />}/>
        <Route path="/createTeam" exact render={(routerProps) => <Team {...routerProps} />}/>
      </Switch>
    </Router>
  )
}

export default Pages
