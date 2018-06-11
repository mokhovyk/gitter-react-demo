import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  INVALIDATE_ROOMS,
  SET_ACTIVE_ROOM,
} from '../actions/types';


export const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  activeItemId: '',
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_ROOM:
      return {
        ...state,
        activeItemId: action.activeItemId,
      };
    case REQUEST_ROOMS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case RECEIVE_ROOMS:
      return {
        ...state,
        items: action.items,
      };
    case INVALIDATE_ROOMS:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
