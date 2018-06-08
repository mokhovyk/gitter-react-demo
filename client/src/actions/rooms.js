import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
} from './types';

export const receiveRooms = (data) => ({
  type: RECEIVE_ROOMS,
  items: data,
});

export const fetchRooms = (userId) => (dispatch) => {
  fetch(`/rooms/?user=${userId}`, {
    credentials: 'include',
  })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      dispatch(receiveRooms(data))
    })
    .catch(() => {
      throw Error();
    });
};
