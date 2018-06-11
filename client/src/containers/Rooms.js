import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRooms } from '../actions/rooms';

type PropsT = {
  userId: string,
  items: Array<any>,
  fetchRoomsAction: any,
};

class Rooms extends PureComponent<PropsT> {
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
    const { items, match } = this.props;
    const activeItemId = match ? match.params.id : '';

    return (
      <Fragment>
        <div className="list-group">
          {items.map((item: any) => (
            <Link
              key={item.id}
              to={`/room/${item.id}`}
              className={`list-group-item list-group-item-action ${activeItemId === item.id ? 'active' : ''}`}
            >
              <img height="42px" src={item.avatarUrl} className="mr-3" alt="room_pic" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
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
