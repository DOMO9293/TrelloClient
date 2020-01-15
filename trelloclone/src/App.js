import React from 'react';
import {
  withRouter,
  Link,
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';

import logo from './logo.svg';
import Mainpage from './pages/main';
import Login from './pages/login';
import Todopage from './pages/todopage.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Mainpage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo" component={Todopage} />
          <Route exact path="/:boardid/list" component={Todopage} />
          <Redirect path="/else" to="todo" />
        </Switch>
      </div>
    </Router>
  );
}

export default withRouter(App);
