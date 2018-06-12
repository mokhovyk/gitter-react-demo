import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import fetchMock from 'fetch-mock';

import configureStore from '../store/configure-store';
import App from '../containers/App';
import LinkToRooms from '../components/LinkToRooms';
import Chat from '../components/Chat';
import Rooms from '../containers/Rooms';

let getMountWrapper;

const dispatchSpy = jest.fn(() => ({}));
const reducerSpy = (state, action) => dispatchSpy(action);
const mockStore = configureStore({ reducerSpy });

const mockedUser = {
  id: 'userIdMocked',
  username: 'userNameMocked',
  displayName: 'displayNameMocked',
  avatarUrl: 'avatarUrlMocked',
};

const mockedRooms = [
  {
    id: 'room1',
    name: 'name1',
  },
  {
    id: 'room2',
    name: 'name2',
  }
];

const mockedMessages = [
  {
    id: 'message1',
    html: 'text1',
    fromUser: {
      displayName: 'user1'
    }
  },
  {
    id: 'message2',
    html: 'text2',
    fromUser: {
      displayName: 'user2'
    }
  }
];

const flushAllPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

fetchMock.restore();
fetchMock.get('/user', mockedUser);
fetchMock.get(`/rooms/?user=${mockedUser.id}`, mockedRooms);
fetchMock.get(`/chat/${mockedRooms[0].id}/?limit=50`, mockedMessages);

describe('App', () => {
  beforeEach(() => {

    getMountWrapper = (path = ['/']) => mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={path}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  });
  
  test('should contains home proper components', async () => {
    const wrapper = getMountWrapper();

    expect(wrapper.find(Rooms)).toHaveLength(0);
    expect(wrapper.find(Chat)).toHaveLength(0);
    expect(wrapper.find(LinkToRooms)).toHaveLength(1);
  });

  test('should auth user on home pages', async () => {
    getMountWrapper();

    await flushAllPromises();

    expect(mockStore.getState().user.userId).toEqual(mockedUser.id);
  });

  test('should receive rooms on rooms page', async () => {
    const wrapper = getMountWrapper(['/room']);

    await flushAllPromises();

    expect(wrapper.find(Rooms)).toHaveLength(1);
    expect(mockStore.getState().rooms.items).toEqual(mockedRooms);
  });

  test('should render chat name and first message correctly', async () => {
    const wrapper = getMountWrapper([`/room/${mockedRooms[0].id}`]);

    expect(wrapper.find(Rooms)).toHaveLength(1);
    expect(wrapper.find(Chat)).toHaveLength(1);

    await flushAllPromises();

    expect(wrapper.find(Chat).find('h2').text()).toEqual(mockedRooms[0].name);
    expect(mockStore.getState().chatCollection[mockedRooms[0].id].messages).toEqual(mockedMessages);
  });
});
