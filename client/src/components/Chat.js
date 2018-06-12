// @flow
import React, { Fragment } from 'react';

type PropsT = {
  messages: Array<any>,
  isLoading: boolean,
  name: string,
  onLoadMore: () => void,
  hasMore: boolean
};

const Chat = ({ messages, isLoading, name, onLoadMore, hasMore }: PropsT) => (
  <Fragment>
    <h2>{name}</h2>
    {messages && messages.length !== 0 &&
      <div className="flex-colum mb-3">
        {messages.map((item: any) => (
          <div key={item.id} className="py-2 border-bottom">
            <div className="text-muted">{item.fromUser.displayName}</div>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}
      </div>
    }
    {isLoading && <div>Loading...</div>}
    {!isLoading && hasMore && <button onClick={onLoadMore} className="btn btn-primary">Load more</button>}
  </Fragment>
);

export default Chat;
