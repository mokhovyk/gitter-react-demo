import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Auth from '../components/Auth';
import Account from '../components/Account';
import ChatContainer from '../containers/ChatContainer';
import Rooms from '../components/Rooms';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: null,
    main: () => <h2>Home</h2>
  },
  {
    path: "/account",
    sidebar: () => <Link to="/room" className="btn btn-primary">Go to rooms</Link>,
    main: Account,
  },
  {
    path: "/room",
    exact: true,
    sidebar: Rooms,
    main: () => <div>choose room!</div>,
  },
  {
    path: "/room/:id",
    exact: true,
    sidebar: Rooms,
    main: ChatContainer
  }
];

class Root extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <header className="navbar navbar-expand navbar-dark bg-dark">
            <span className="navbar-brand" >Logo</span>
            <div className="ml-auto">
              <Auth />
            </div>
          </header>
          <div className="container-fluid">
            <div className="row">
              <aside className="col-3 p-3">
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                ))}
              </aside>
              <main className="col-9 p-3">
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </main>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default Root;