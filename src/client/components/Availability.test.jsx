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
            past: {
              completedItems: [],
              blockingItems: [{title: 'bla'}]
            },
            future: {
              availability: 'here',
              plannedItems: []
            }
          },
          {
            username: 'user2',
            statusKnown: false,
            past: {
              completedItems: []
            },
            future: {
              availability: '',
              plannedItems: []
            }
          },
        ]}
        contentEditable={false}
        updateValue={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
