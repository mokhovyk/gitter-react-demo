import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import user from '../reducers/user';
import rooms from '../reducers/rooms';
import chat from '../reducers/chat';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

export default () => (
  createStore(
    combineReducers({
      user,
      rooms,
      chat,
    }),
    applyMiddleware(...middlewares),
  )
)
