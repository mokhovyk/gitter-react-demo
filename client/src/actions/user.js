// @flow
import {
  RECEIVE_USER,
  REMOVE_USER,
} from './types';

import api from '../helpers/api';

type FunctionType = (any) => void;

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const receiveUser = (data: Object) => ({
  type: RECEIVE_USER,
  userId: data.id,
  userName: data.username,
  displayName: data.displayName,
  avatarUrl: data.avatarUrl,
});

export const fetchUser = () => async (dispatch: FunctionType) => {
  try {
    const payload = await api(`/user`);
    dispatch(receiveUser(payload));
  } catch (error) {
    dispatch(removeUser());
  }
};
