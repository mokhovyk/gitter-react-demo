import {
  RECEIVE_CHAT,
} from './types';

export const receiveChat = (data) => ({
  type: RECEIVE_CHAT,
  messages: data,
});

export const fetchChatMessages = (roomId) => (dispatch) => {
  fetch(`/chat/${roomId}/?limit=50`, {
    credentials: 'include',
  })
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      dispatch(receiveChat(data))
    })
    .catch(() => {
      throw Error();
    });
};
