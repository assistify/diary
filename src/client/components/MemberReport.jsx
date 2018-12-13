import React from 'react';

import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Tag from 'react-bulma-components/lib/components/tag';

import ActivityItems from './Activity';
import Avatar from './Avatar';
import { memberReportType } from '../../models/memberReportType';
import User from './User';

export default function MemberReport(props) {
  const {
    username, past, statusKnown, future
  } = props;
  const { workingOnItems, completedItems, blockingItems } = past;
  const { plannedItems } = future;

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
              { blockingItems
              && (
                <Tag size="medium" className="blocked">
                  Blockiert
                </Tag>
              )
            }
            </Tag.Group>
          </Card.Header>
          <Card.Content>
            { blockingItems
              && (
              <ActivityItems
                title="Blockiert"
                list={blockingItems}
                className="blocking"
              />
              )}
            <ActivityItems
              title="Erledigt"
              list={completedItems}
              className="completed"
            />
            <ActivityItems
              title="Arbeitet an"
              list={workingOnItems}
              className="worked-on"
            />

            <ActivityItems
              title="Geplant"
              list={plannedItems}
              className="planned"
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

MemberReport.propTypes = memberReportType;
