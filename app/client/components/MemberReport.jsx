import React from 'react';

import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';
import User from './User';

export default function MemberReport(props) {
  const {
    username, past
  } = props;
  const { workedOnItems, completedItems, blockingItems } = past;

  return (
    <Columns.Column renderAs="article" size={6}>
      <Card className="member">
        <Card.Header>
          <Card.Header.Title><User username={username} /></Card.Header.Title>
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
            title="Beschäftigt mit"
            list={workedOnItems}
            className="worked-on"
          />

          <ActivityItems
            title="Erledigt"
            list={completedItems}
            className="completed"
          />
        </Card.Content>
      </Card>
    </Columns.Column>
  );
}

MemberReport.propTypes = memberReportType;
