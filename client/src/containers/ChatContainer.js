// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../actions/chat';
import { setActiveRoom } from '../actions/rooms';

import Chat from '../components/Chat';

type PropsT = {
  setActiveRoomAction: (string) => void,
  fetchChatMessagesAction: (string, ?string) => void,
  match: Object,
  chatCollection: Object,
  rooms: Array<any>
};

type StateT = {
  id: string,
  name: string
}

class ChatContainer extends Component<PropsT, StateT> {
  static getDerivedStateFromProps(props: PropsT, state: StateT) {
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

  state: StateT = {
    id: '',
    name: '',
  };

  componentDidUpdate(prevProps: PropsT) {
    const { rooms } = this.props;

    if (prevProps.rooms !== rooms) {
      const { id } = this.state;
      const activeRoom = rooms.find(item => item.id === id) || {};

      this.setState({
        name: activeRoom.name,
      });

      this.props.fetchChatMessagesAction(id);
    }
  }

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

const mapStateToProps = ({ chatCollection, rooms }): Object => ({
  chatCollection,
  rooms: rooms.items,
});

export default connect(mapStateToProps, {
  setActiveRoomAction: setActiveRoom,
  fetchChatMessagesAction: fetchChatMessages,
})(ChatContainer);
