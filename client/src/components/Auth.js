import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/user';

class Auth extends Component {
  componentDidMount() {
    this.props.fetchUserAction();
  }

  render() {
    const { isAuthorized, displayName, avatarUrl } = this.props;

    return (
      <div>
        {isAuthorized ?
          <a href="/logout">logout</a> :
          <a href="/login">login</a>
        }
        <br />
        {isAuthorized &&
          <Fragment>
            <img src={avatarUrl} height="50px" alt="avatar" />
            <div>displayName: {displayName}</div>
          </Fragment>
        }
      </div>
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
