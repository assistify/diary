import React from 'react';
import ActivityItems from './ActivityItem';
import { memberReportType } from '../../models/memberReportType';

export default function MemberReport(props) {
  const {
    name, past, future
  } = props;
  const { workedOnItems, completedItems, blockingItems } = past;
  const { availability, plannedItems } = future;

  return (
    <div className="member">
      <h3>{name}</h3>
      <div className="availability">{availability}</div>
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

    </div>
  );
}

MemberReport.propTypes = memberReportType;
