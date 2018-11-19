import React from 'react';

import Card from 'react-bulma-components/lib/components/card';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';

export default function MemberReport(props) {
  const {
    name, past, future
  } = props;
  const { workedOnItems, completedItems, blockingItems } = past;
  const { availability, plannedItems } = future;

  return (
    <Columns.Column renderAs="article" size={6}>
      <Card className="member">
        <Card.Header>
          <Card.Header.Title>{name}</Card.Header.Title>
          <Card.Header>
            <Tag.Group>
              { blockingItems
              && (
                <Tag size="medium" className="blocked">
                  Blockiert
                </Tag>
              )
            }
              <Tag color="info" size="medium">
                {`${availability}`}
              </Tag>
            </Tag.Group>
          </Card.Header>
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

          <ActivityItems
            title="Als nächstes"
            list={plannedItems}
            className="next"
          />
        </Card.Content>
      </Card>
    </Columns.Column>
  );
}

MemberReport.propTypes = memberReportType;
