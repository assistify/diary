import React from 'react';
import { activityType } from '../../models/activityType';
import ActivityItems from './ActivityItem';

export default function MemberActivity(props) {
  const {
    name, availability, workedOnItems, completedItems, plannedItems, blockingItems
  } = props;

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

MemberActivity.propTypes = activityType;
