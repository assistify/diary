import React from 'react';
import Card from 'react-bulma-components/lib/components/card';
import ActivityItems from './ActivityItem';
import { memberReportType } from '../../models/memberReportType';

export default function MemberReport(props) {
  const {
    name, past, future
  } = props;
  const { workedOnItems, completedItems, blockingItems } = past;
  const { availability, plannedItems } = future;

  return (
    <Card className="member">
      <Card.Header>
        <Card.Header.Title>{name}</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <div className="availability">
          {availability}
        </div>
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

        <ActivityItems
          title="Blockiert"
          list={blockingItems}
          className="blocking"
        />
      </Card.Content>
    </Card>
  );
}

MemberReport.propTypes = memberReportType;
