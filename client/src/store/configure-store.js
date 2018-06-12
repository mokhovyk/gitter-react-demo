import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import user from '../reducers/user';
import rooms from '../reducers/rooms';
import chatCollection from '../reducers/chatCollection';

const defaultMiddlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  defaultMiddlewares.push(createLogger());
}

export default (optionalReducers, optionalMiddlewares = []) => (
  createStore(
    combineReducers({
      user,
      rooms,
      chatCollection,
      ...optionalReducers,
    }),
    applyMiddleware(...defaultMiddlewares, ...optionalMiddlewares),
  )
)
