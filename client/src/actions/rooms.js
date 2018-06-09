import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
} from './types';

import api from '../helpers/api';

export const receiveRooms = (data) => ({
  type: RECEIVE_ROOMS,
  items: data,
});

export const fetchRooms = (userId) => async (dispatch) => {
  try {
    const payload = await api(`/rooms/?user=${userId}`);
    dispatch(receiveRooms(payload))
  } catch (error) {
    throw Error();
  }
};
