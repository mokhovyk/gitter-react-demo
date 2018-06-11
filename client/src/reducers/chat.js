import {
  REQUEST_CHAT,
  RECEIVE_CHAT,
  INVALIDATE_CHAT,
} from '../actions/types';

export const INITIAL_CHAT_STATE = {
  isLoading: false,
  isError: false,
  hasMore: true,
  messages: [],
};

export default (state = INITIAL_CHAT_STATE, action) => {
  switch (action.type) {
    case REQUEST_CHAT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case RECEIVE_CHAT:
      return {
        ...state,
        isLoading: false,
        messages: action.messages,
      };
    case INVALIDATE_CHAT:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
