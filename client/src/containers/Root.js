import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Auth from '../components/Auth';
import Account from '../components/Account';
import Chat from '../components/Chat';
import Rooms from '../components/Rooms';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/account",
    sidebar: () => <div>account!</div>,
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
    main: Chat
  }
];

class Root extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <header className="navbar navbar-expand">
            <span>Logo</span>
            <Link to="/account">Account</Link>
            <Auth />
          </header>
          <div className="container-fluid">
            <div className="row">
              <aside className="col-3">
                <Link to="/room">go to rooms</Link>

                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                ))}
              </aside>
              <main className="col-9">
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