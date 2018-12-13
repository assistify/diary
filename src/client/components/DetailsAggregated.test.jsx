import React from 'react';
import renderer from 'react-test-renderer';
import DetailsAggregated from './DetailsAggregated';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <DetailsAggregated
        teamReport={[
          {
            username: 'user1',
            future: {
              availability: 'irrelevant',
              plannedItems: [
                { title: 'planned 1', details: 'some details' }
              ]
            },
            past: {
              blockingItems: []
            }
          },
          {
            username: 'user2',
            future: {
              availability: 'irrelevant',
              plannedItems: [
                { title: 'planned 2', details: 'some details' }
              ]
            },
            past: {
              blockingItems: [
                { title: 'blocking 2', details: 'some details' }
              ]
            }
          }
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('aggregates correctly', () => {
  const tree = renderer
    .create(
      <DetailsAggregated
        teamReport={[
          {
            username: 'user1',
            statusKnown: true,
            future: {
              availability: 'irrelevant',
              plannedItems: [
                { title: 'planned 1', details: 'some details' }
              ]
            },
            past: {
              blockingItems: []
            }
          },
          {
            username: 'user2',
            statusKnown: true,
            future: {
              availability: 'irrelevant',
              plannedItems: [
                { title: 'planned 1', details: 'some details' }
              ]
            },
            past: {
              blockingItems: []
            }
          }
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a placeholder if nothing\'s planned', () => {
  const tree = renderer
    .create(
      <DetailsAggregated
        teamReport={[
          {
            username: 'user1',
            future: {
              availability: 'irrelevant',
              plannedItems: []
            },
            past: {
              blockingItems: []
            }
          },
          {
            username: 'user2',
            future: {
              availability: 'irrelevant',
              plannedItems: []
            },
            past: {
              blockingItems: []
            }
          }
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
