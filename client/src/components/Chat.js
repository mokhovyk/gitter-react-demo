import React, { Component } from 'react';

class Chat extends Component {
  render() {
    const { id, messages } = this.props;

    return (
      <div>
        <h2>{id}</h2>
        <h4>{messages && messages.length}</h4>
  
        {messages && messages.length !== 0 &&
          <ul className="list-group">
            {messages.map(item => (
              <li key={item.id} className="list-group-item">{item.text}</li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

export default Chat;
