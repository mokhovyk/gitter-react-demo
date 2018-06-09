import {
  REQUEST_CHAT,
  RECEIVE_CHAT,
  INVALIDATE_CHAT,
} from './types';

import api from '../helpers/api';

export const errorChat = (roomId) => ({
  type: INVALIDATE_CHAT,
  id: roomId,
});

export const requestChat = (roomId) => ({
  type: REQUEST_CHAT,
  id: roomId,
});

export const receiveChat = (roomId, data) => ({
  type: RECEIVE_CHAT,
  id: roomId,
  messages: data,
});

export const fetchChatMessages = (roomId) => async (dispatch) => {
  dispatch(requestChat(roomId));
  
  try {
    const payload = await api(`/chat/${roomId}/?limit=50`);
    dispatch(receiveChat(roomId, payload))
  } catch (error) {
    dispatch(errorChat(roomId, error));
  }
};

