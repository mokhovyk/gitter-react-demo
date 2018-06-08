import {
  RECEIVE_USER,
  REMOVE_USER,
} from './types';


export const removeUser = () => ({
  type: REMOVE_USER,
});

export const receiveUser = (data) => ({
  type: RECEIVE_USER,
  userId: data.id,
  userName: data.username,
  displayName: data.displayName,
  avatarUrl: data.avatarUrl,
});

export const fetchUser = () => (dispatch) => {
  fetch('/user', {
    credentials: 'include',
  })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      dispatch(receiveUser(data))
    })
    .catch(() => {
      throw Error();
    });
};
