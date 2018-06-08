import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Account extends Component {
  render() {
    const { isAuthorized, userId, userName, displayName, avatarUrl } = this.props;

    return (
      <div>
        My account:
        <img src={avatarUrl} alt="avatar" />
        <div>userId: {userId}</div>
        <div>userName: {userName}</div>
        <div>displayName: {displayName}</div>

        <Link to="/">back to Home (Account)</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps)(Account);
