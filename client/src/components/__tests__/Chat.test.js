import React from 'react';
import Chat from '../Chat';

let props;
let component;

describe('Chat', () => {
  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      messages: [],
      isLoading: false,
      name: 'My Chat',
      onLoadMore: jest.fn(),
      hasMore: true,
    };
    component = shallow(
      <Chat {...props} />,
    );
  });

  test('renders correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  test('renders correctly without load more button', () => {
    component = shallow(
      <Chat
        {...props}
        hasMore={false}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });

  test('click correctly', () => {
    component.find('button').simulate('click', { preventDefault: jest.fn() });
    expect(props.onLoadMore).toBeCalled();
  });
});
