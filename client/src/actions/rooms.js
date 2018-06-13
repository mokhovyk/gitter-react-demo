// @flow
import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  INVALIDATE_ROOMS,
} from './types';

import api from '../helpers/api';

type FunctionType = (any) => void;

export const errorRooms = () => ({
  type: INVALIDATE_ROOMS,
});

export const requestRooms = () => ({
  type: REQUEST_ROOMS,
});

export const receiveRooms = (data: Object) => ({
  type: RECEIVE_ROOMS,
  items: data,
});

export const fetchRooms = (userId: string) => async (dispatch: FunctionType) => {
  dispatch(requestRooms());

  try {
    const payload = await api(`/rooms/?user=${userId}`);
    dispatch(receiveRooms(payload))
  } catch (error) {
    dispatch(errorRooms());
  }
};
