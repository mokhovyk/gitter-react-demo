import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChatMessages } from '../actions/chat';

class Chat extends Component {
  componentDidMount() {
    const { match } = this.props;
    
    this.props.fetchChatMessagesAction(match.params.id);
  }

  render() {
    const { match, messages } = this.props;

    return (
      <div>
        Chat:
        <h3>ID: {match.params.id}</h3>

        <ul>
          {messages.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ chat }) => ({
  messages: chat.messages,
});

export default connect(mapStateToProps, {
  fetchChatMessagesAction: fetchChatMessages,
})(Chat);
