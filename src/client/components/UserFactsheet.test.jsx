import React from 'react';
import renderer from 'react-test-renderer';
import UserFactsheet from './UserFactsheet';

it('renders correctly', () => {
  const tree = renderer
    .create(<UserFactsheet username="testuser">
      <div className="sampleChild">sample Child should be rendered</div>
            </UserFactsheet>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});