import reducer from '../rooms';
import { requestRooms, receiveRooms } from '../../actions/rooms';

describe('rooms reducer', () => {
  let sut;
  let initialState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      hasError: false,
      items: [],
    };

    sut = (action = {}) => reducer(initialState, action);
  });

  test('should return initial state', () => {
    expect(sut()).toEqual(initialState);
  });

  test('should change loading status', () => {
    expect(sut(requestRooms()).isLoading).toEqual(true);
  });

  test('should save rooms items receiving', () => {
    const payload = [
      {
        id: 'room1',
        name: 'name1',
      },
      {
        id: 'room2',
        name: 'name2',
      }
    ];

    expect(receiveRooms(payload).items).toEqual(payload);
  });
});
