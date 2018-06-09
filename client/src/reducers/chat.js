import {
  RECEIVE_CHAT,
} from '../actions/types';

export const INITIAL_CHAT_STATE = {
  messages: [],
};

export default (state = INITIAL_CHAT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_CHAT:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};
