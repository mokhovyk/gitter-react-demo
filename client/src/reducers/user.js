import {
  RECEIVE_USER,
  REMOVE_USER,
} from '../actions/types';

export const INITIAL_STATE = {
  isAuthorized: false,
  userId: '',
  userName: '',
  avatarUrl: '',
  displayName: '',
};

export default (state = INITIAL_STATE, { type, userName, displayName, avatarUrl, userId }) => {
  switch (type) {
    case RECEIVE_USER:
      return {
        ...state,
        displayName,
        userName,
        avatarUrl,
        userId,
        isAuthorized: true,
      };
    case REMOVE_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
