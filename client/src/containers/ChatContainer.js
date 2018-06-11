import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../actions/chat';
import { setActiveRoom } from '../actions/rooms';

import Chat from '../components/Chat';

type PropsT = {
  setActiveRoomAction: any,
  fetchChatMessagesAction: any,
  match: any,
  chatCollection: Object,
  rooms: Array<any>
};

type StateT = {
  id: string,
  name: string
}

class ChatContainer extends Component<PropsT, StateT> {
  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    let { name } = state;

    if (id !== state.id && props.rooms.length !== 0) {
      const activeRoom = props.rooms.find(item => item.id === id) || {};

      name = activeRoom.name;
      props.fetchChatMessagesAction(id);
    }

    return {
      id,
      name,
    };
  }

  state = {
    id: '',
    name: '',
  };

  render() {
    const { chatCollection, fetchChatMessagesAction } = this.props;
    const { id, name } = this.state;
    const activeChat = chatCollection[id];

    return (
      <Chat
        name={name}
        onLoadMore={() => fetchChatMessagesAction(id, activeChat.lastItemId)}
        {...activeChat}
      />
    );
  }
}

const mapStateToProps = ({ chatCollection, rooms }) => ({
  chatCollection,
  rooms: rooms.items,
});

export default connect(mapStateToProps, {
  setActiveRoomAction: setActiveRoom,
  fetchChatMessagesAction: fetchChatMessages,
})(ChatContainer);
