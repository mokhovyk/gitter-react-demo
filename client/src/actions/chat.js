// @flow
import {
  REQUEST_CHAT,
  RECEIVE_CHAT,
  INVALIDATE_CHAT,
} from './types';

import api from '../helpers/api';

export const errorChat = (roomId: string) => ({
  type: INVALIDATE_CHAT,
  id: roomId,
});

export const requestChat = (roomId: string) => ({
  type: REQUEST_CHAT,
  id: roomId,
});

export const receiveChat = (roomId: string, data: any) => ({
  type: RECEIVE_CHAT,
  id: roomId,
  messages: data,
});

export const fetchChatMessages = (roomId: string, after: any) => async (dispatch: any) => {
  dispatch(requestChat(roomId));

  try {
    const payload = await api(`/chat/${roomId}/?limit=50`);
    dispatch(receiveChat(roomId, payload));
  } catch (error) {
    dispatch(errorChat(roomId));
  }
};
