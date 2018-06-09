import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRooms } from '../actions/rooms';

class Rooms extends PureComponent {
  componentDidMount() {
    const { userId } = this.props;

    if (userId) {
      this.props.fetchRoomsAction(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    
    if (userId && prevProps.userId !== userId) {
       this.props.fetchRoomsAction(userId);
    }
  }

  render() {
    const { items } = this.props;

    return (
      <Fragment>
        <ul className="list-group">
          {items.map((item) => (
            <li key={item.id} className="list-group-item">
              <img height="50px" src={item.avatarUrl} />
              <Link to={`/room/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, rooms }) => ({
  userId: user.userId,
  items: rooms.items,
});

export default connect(mapStateToProps, {
  fetchRoomsAction: fetchRooms,
})(Rooms);
