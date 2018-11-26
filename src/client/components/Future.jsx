import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';
import Availabilities from './Availability';

export default function Future(props) {
  const { teamReport } = props;

  const allPlannedItems = teamReport.reduce(
    (all, memberReport) => {
      const plannedBy = memberReport.future.plannedItems
        ? memberReport.future.plannedItems.map(plannedItem => ({
          title: plannedItem.title,
          details: plannedItem.details,
          owners: [memberReport.username]
        }))
        : [];

      return all.concat(plannedBy);
    },
    []
  );

  const aggregatedItems = allPlannedItems.reduce((aggregated, item) => {
    const sameTitleItemIndex = aggregated.findIndex(aggregatedItem => aggregatedItem.title === item.title);
    if (sameTitleItemIndex >= 0) {
      aggregated[sameTitleItemIndex].owners.push(...item.owners);
    } else {
      aggregated.push(item);
    }
    return aggregated;
  },
  []);

  return (
    <Section className="c-future">

      <Availabilities
        members={teamReport.map(memberReport => ({
          username: memberReport.username,
          availability: memberReport.future.availability,
          statusKnown: memberReport.statusKnown,
          blocked: memberReport.past.blockingItems && memberReport.past.blockingItems.length > 0
        }))}
      />

      <Heading size={3}>Was ansteht</Heading>

      <ActivityItems
        title="Geplante Tätigkeiten"
        list={aggregatedItems}
        className="next"
      />
    </Section>

  );
}

Future.propTypes = {
  teamReport: PropTypes.arrayOf(PropTypes.shape(memberReportType)).isRequired
};