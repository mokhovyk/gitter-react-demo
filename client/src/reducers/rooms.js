import {
  RECEIVE_ROOMS,
} from '../actions/types';

export const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_ROOMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
};
