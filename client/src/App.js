import React, { Component } from 'react';

import Auth from './components/Auth';
import Home from './components/Home';
import Home2 from './components/Home2';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Router>
        <div>
          <Auth />
          <div>my app</div>
          <a href="/login">Sign in</a>
          <Link to="/next">Dashboard</Link>
          <Route exact path="/" component={Home}/>
          <Route path="/next" component={Home2}/>
        </div>
      </Router>
    );
  }
}

export default App;