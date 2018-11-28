import React from 'react';
import renderer from 'react-test-renderer';
import Availability from './Availability';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Availability
        members={[
          {
            username: 'user1',
            statusKnown: true,
            availability: 'here',
            blocked: true
          },
          {
            username: 'user2',
            statusKnown: false,
            availability: '',
            blocked: false
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
