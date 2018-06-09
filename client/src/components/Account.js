import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Account extends Component {
  render() {
    const { isAuthorized, userId, userName, displayName, avatarUrl } = this.props;

    return (
      <ul className="list-group">
        <li className="list-group-item"><h2>My account</h2></li>
        <li className="list-group-item"><img src={avatarUrl} alt="avatar" /></li>
        <li className="list-group-item">userId: {userId}</li>
        <li className="list-group-item">userName: {userName}</li>
        <li className="list-group-item">displayName: {displayName}</li>
      </ul>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  ...user,
});

export default connect(mapStateToProps)(Account);
