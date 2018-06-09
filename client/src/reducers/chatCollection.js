import chat, { INITIAL_CHAT_STATE } from './chat';
import {
  RECEIVE_ROOMS,
  REQUEST_CHAT,
  RECEIVE_CHAT,
  INVALIDATE_CHAT,
} from '../actions/types';
import { REMOVE_USER } from '../actions/types';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_ROOMS:
      const newState = {};
      
      action.items.forEach((item) => {
        newState[item.id] = INITIAL_CHAT_STATE;
      });

      return newState;
    case RECEIVE_CHAT:
    case REQUEST_CHAT:
    case INVALIDATE_CHAT:
      return {
        ...state,
        [action.id]: chat(state[action.id], action)
      };
    case REMOVE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
