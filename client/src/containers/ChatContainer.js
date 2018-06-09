import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../actions/chat';

import Chat from '../components/Chat';

class ChatContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    
    this.props.fetchChatMessagesAction(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    
    if (match.params.id !== prevProps.match.params.id) {
       this.props.fetchChatMessagesAction(match.params.id);
    }
  }

  render() {
    const { chat, match } = this.props;

    return (
      <Chat id={match.params.id} {...chat} />
    );
  }
}

const mapStateToProps = ({ chatCollection }, ownProps) => {
  const chat = chatCollection[ownProps.match.params.id];
  
  return {
    chat,
  }
};

export default connect(mapStateToProps, {
  fetchChatMessagesAction: fetchChatMessages,
})(ChatContainer);
