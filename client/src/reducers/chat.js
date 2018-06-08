import {
  RECEIVE_CHAT,
} from '../actions/types';

export const INITIAL_STATE = {
  messages: [],
};

export default (state = INITIAL_STATE, action) => {
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
