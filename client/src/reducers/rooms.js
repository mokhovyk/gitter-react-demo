import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  INVALIDATE_ROOMS,
} from '../actions/types';

export const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_ROOMS:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case RECEIVE_ROOMS:
      return {
        ...state,
        isLoading: false,
        items: action.items,
      };
    case INVALIDATE_ROOMS:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
