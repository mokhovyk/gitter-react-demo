// @flow
import React from 'react';

type PropsT = {
  messages: Array<any>,
  isLoading: boolean,
  name: string,
  onLoadMore: () => void,
  hasMore: boolean
};

const Chat = ({ messages, isLoading, name, onLoadMore, hasMore }: PropsT) => (
  <div>
    <h2>{name}</h2>
    {messages && messages.length !== 0 &&
      <ul className="list-group">
        {messages.map((item: any) => (
          <li key={item.id} className="list-group-item">{item.text}</li>
        ))}
      </ul>
    }
    {isLoading && <div>Loading...</div>}
    {!isLoading && hasMore && <button onClick={onLoadMore}>Load more</button>}
  </div>
);

export default Chat;
