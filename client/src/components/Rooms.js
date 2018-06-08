import React, { PureComponent } from 'react';
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

  render() {
    const { userId, items } = this.props;

    return (
      <div>
        <div>userId: {userId}</div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img height="50px" src={item.avatarUrl} />
              <Link to={`/room/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
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
