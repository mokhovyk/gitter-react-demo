import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUser } from '../actions/user';

class Auth extends Component {
  componentDidMount() {
    this.props.fetchUserAction();
  }

  render() {
    const { isAuthorized, displayName, avatarUrl } = this.props;

    return (
      <ul className="navbar-nav flex-row">
        {isAuthorized &&
          <li className="nav-item">
            <Link to="/account" className="btn-group mr-3">
              <div className="btn-group">
                <img src={avatarUrl} height="38px" alt="avatar" className="rounded-left" />
              </div>
              <span className="btn btn-primary">{displayName}</span>
            </Link>
          </li>
        }
        <li className="nav-item">
          {isAuthorized ?
            <a className="btn btn-primary" href="/logout">logout</a> :
            <a className="btn btn-primary" href="/login">login</a>
          }
        </li>
      </ul>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  isAuthorized: user.isAuthorized,
  displayName: user.displayName,
  avatarUrl: user.avatarUrl,
});

export default connect(mapStateToProps, {
  fetchUserAction: fetchUser,
})(Auth);
