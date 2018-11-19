import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';
import Availabilities from './Availability';

export default function Future(props) {
  const { teamReport } = props;

  const allPlannedItems = teamReport.reduce(
    (all, memberReport) => {
      const plannedBy = memberReport.future.plannedItems.map(plannedItem => ({
        title: plannedItem.title,
        details: plannedItem.details,
        owner: memberReport.name
      }));
      return all.concat(plannedBy);
    },
    []
  );

  return (
    <Container className="c-future">

      <Availabilities
        members={teamReport.map(memberReport => ({
          name: memberReport.name,
          availability: memberReport.future.availability
        }))}
      />

      <Heading size={3}>Was ansteht</Heading>

      <ActivityItems
        title="Geplante Tätigkeiten"
        list={allPlannedItems}
        className="next"
      />
    </Container>

  );
}

Future.propTypes = {
  teamReport: PropTypes.arrayOf(PropTypes.shape(memberReportType)).isRequired
};
