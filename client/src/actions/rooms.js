import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  INVALIDATE_ROOMS,
  SET_ACTIVE_ROOM,
} from './types';

import api from '../helpers/api';


export const errorRooms = () => ({
  type: INVALIDATE_ROOMS,
});

export const requestRooms = () => ({
  type: REQUEST_ROOMS,
});

export const receiveRooms = (data) => ({
  type: RECEIVE_ROOMS,
  items: data,
});

export const setActiveRoom = (activeItemId) => ({
  type: SET_ACTIVE_ROOM,
  activeItemId,
});

export const fetchRooms = (userId) => async (dispatch) => {
  dispatch(requestRooms());

  try {
    const payload = await api(`/rooms/?user=${userId}`);
    dispatch(receiveRooms(payload))
  } catch (error) {
    dispatch(errorRooms());
  }
};
