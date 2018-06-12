import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Account, { AccountComponent} from '../Account';

let props;
let component;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Account', () => {
  beforeEach(() => {
    props = {
      userId: 'userId123',
      userName: 'johndoe',
      displayName: 'John Doe',
      avatarUrl: 'avatar.png',
    };
    component = shallow(
      <AccountComponent {...props} />,
    );
  });

  test('renders correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders connected container', () => {
    const initialState = {
      user: {
        userId: 'userId123',
        userName: 'johndoe',
        displayName: 'John Doe',
        avatarUrl: 'avatar.png',
      },
    };
    const store = mockStore(initialState);
    const container = shallow(
      <AccountComponent />,
      { context: { store } },
    );

    expect(toJson(container)).toMatchSnapshot();
  });
});
