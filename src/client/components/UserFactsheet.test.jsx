import React from 'react';
import renderer from 'react-test-renderer';
import UserFactsheet from './UserFactsheet';

it('renders correctly', () => {
  const member = {
    username: 'testuser',
    statusKnown: true,
    past: {},
    future: {}
  };

  const tree = renderer
    .create(
      <UserFactsheet member={member} contentEditable={false} updateValue={() => {}}>
        <div className="sampleChild">sample Child should be rendered</div>
      </UserFactsheet>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
