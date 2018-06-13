import { requestRooms, receiveRooms } from '../../actions/rooms';
import {
  REQUEST_ROOMS,
  RECEIVE_ROOMS,
  INVALIDATE_ROOMS,
} from '../../actions/types';

describe('rooms action', () => {
  const userId = 'user';
  const mockedPayload = [
    {
      id: 'room1',
      name: 'name1',
    },
    {
      id: 'room2',
      name: 'name2',
    }
  ];

  test('should return Request action', () => {
    const expectedObject = {
      type: REQUEST_ROOMS,
    };
    expect(requestRooms()).toMatchObject(expectedObject);
  });

  test('should return Recieve action', () => {
    const expectedObject = {
      type: RECEIVE_ROOMS,
      items: mockedPayload,
    };
    expect(receiveRooms(mockedPayload)).toMatchObject(expectedObject);
  });
});
