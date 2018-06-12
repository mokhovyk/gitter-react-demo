// @flow
import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import ChatContainer from './ChatContainer';
import Rooms from './Rooms';
import Auth from '../components/Auth';
import Account from '../components/Account';
import LinkToRooms from '../components/LinkToRooms';

import { fetchUser } from '../actions/user';

type PropsT = {
  fetchUserAction: () => void
};

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: null,
    main: LinkToRooms,
  },
  {
    path: '/account',
    exact: false,
    sidebar: LinkToRooms,
    main: Account,
  },
  {
    path: '/room',
    exact: true,
    sidebar: Rooms,
    main: () => <div>Choose room!</div>,
  },
  {
    path: '/room/:id',
    exact: true,
    sidebar: Rooms,
    main: ChatContainer
  }
];

class App extends Component<PropsT> {
  componentDidMount() {
    this.props.fetchUserAction();
  }

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
                    key={index.toString()}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                ))}
              </aside>
              <main className="col-9 p-3">
                {routes.map((route, index) => (
                  <Route
                    key={index.toString()}
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

export default connect(null, {
  fetchUserAction: fetchUser,
})(App);
