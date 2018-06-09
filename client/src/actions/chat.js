import {
  RECEIVE_CHAT,
} from './types';

export const receiveChat = (roomId, data) => ({
  type: RECEIVE_CHAT,
  id: roomId,
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
      dispatch(receiveChat(roomId, data))
    })
    .catch(() => {
      throw Error();
    });
};
