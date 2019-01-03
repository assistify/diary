import React from 'react';
import renderer from 'react-test-renderer';
import ActivityItems from './Activity';

it('renders a list correctly', () => {
  const tree = renderer
    .create(
      <ActivityItems
        title="sample"
        list={[
          { title: 'sample title 1', details: 'sample details' },
          { title: 'sample title 2', details: 'sample details' },
        ]}
        className="sample"
        contentEditable={false}
        updateValue={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not render an empty list', () => {
  const tree = renderer
    .create(
      <ActivityItems
        title="empty"
        list={[]}
        className="sample"
        contentEditable={false}
        updateValue={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('does not render a list without titled items', () => {
  const tree = renderer
    .create(
      <ActivityItems
        title="no-title"
        list={[{ title: '' }]}
        className="sample"
        contentEditable={false}
        updateValue={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
