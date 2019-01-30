import React from 'react';
import { PropTypes } from 'prop-types';

import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Tag from 'react-bulma-components/lib/components/tag';

import ActivityItems from './Activity';
import Avatar from './Avatar';
import { memberReportType } from '../../models/memberReportType';
import User from './User';

import isBlocked from '../lib/isBlocked';

export default function MemberReport(props) {
  const {
    username, past, statusKnown, future, contentEditable, updateValue
  } = props;
  const { workingOnItems, completedItems, blockingItems } = past;
  const { plannedItems } = future;

  function addOwnerToItems(items, owner) {
    const withOwner = [];
    if (items) {
      items.forEach(item => withOwner.push(Object.assign({}, item, { owners: [owner] })));
    }
    return withOwner;
  }

  if (statusKnown) {
    return (
      <Columns.Column renderAs="article" size={6}>
        <Card className="member">
          <Card.Header>
            <Card.Header.Title>
              <Avatar
                size={64}
                username={username}
              />
              <User username={username} />
            </Card.Header.Title>
            <Tag.Group>
              { isBlocked(blockingItems)
              && (
                <Tag size="medium" className="blocked">
                  Blockiert
                </Tag>
              )}
              { contentEditable
              && (
                <div>
                  <input
                    type="checkbox"
                    checked={isBlocked(blockingItems)}
                    onChange={(event) => {
                      const value = event.target.checked ? [{ title: 'Ich brauche...' }] : undefined;
                      updateValue(username, 'past.blockingItems', value);
                    }}
                  />
                  &nbsp; blockiert
                </div>
              )}
            </Tag.Group>
          </Card.Header>
          <Card.Content>
            { blockingItems
              && (
              <ActivityItems
                title="Blockiert"
                list={addOwnerToItems(blockingItems, username)}
                className="blocking"
                contentEditable={contentEditable}
                updateValue={(liIndex, title) => {
                  blockingItems[liIndex] = { title };
                  updateValue(username, 'past.blockingItems', blockingItems);
                }}
              />
              )}
            <ActivityItems
              title="Erledigt"
              list={addOwnerToItems(completedItems, username)}
              className="completed"
              contentEditable={contentEditable}
              updateValue={(liIndex, title) => {
                completedItems[liIndex] = { title };
                updateValue(username, 'past.completedItems', completedItems);
              }}
            />
            <ActivityItems
              title="Arbeitet an"
              list={addOwnerToItems(workingOnItems, username)}
              className="worked-on"
              contentEditable={contentEditable}
              updateValue={(liIndex, title) => {
                workingOnItems[liIndex] = { title };
                updateValue(username, 'past.workingOnItems', workingOnItems);
              }}
            />

            <ActivityItems
              title="Geplant"
              list={addOwnerToItems(plannedItems, username)}
              className="planned"
              contentEditable={contentEditable}
              updateValue={(liIndex, title) => {
                plannedItems[liIndex] = { title };
                updateValue(username, 'future.plannedItems', plannedItems);
              }}
            />
          </Card.Content>
        </Card>
      </Columns.Column>
    );
  }
  return (
    <Columns.Column renderAs="article" size={6}>
      <Card className="member">
        <Card.Header>
          <Card.Header.Title><User username={username} /></Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Container className="unknown-status" />
        </Card.Content>
      </Card>
    </Columns.Column>);
}

MemberReport.propTypes = Object.assign({
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
}, memberReportType);
