import React from 'react';
import renderer from 'react-test-renderer';
import User from './User';

it('renders correctly', () => {
  const tree = renderer
    .create(<User username="testuser" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
