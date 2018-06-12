// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

type PropsT = {
  isAuthorized: boolean
};

const LinkToRooms = ({ isAuthorized }: PropsT) => (
  <Fragment>
    {isAuthorized ?
      <Link to="/room" className="btn btn-primary">Go to rooms</Link>
      :
      <a className="btn btn-primary" href="/login">login</a>
    }
  </Fragment>
);

const mapStateToProps = ({ user: { isAuthorized } }) => ({
  isAuthorized,
});

export default connect(mapStateToProps)(LinkToRooms);
