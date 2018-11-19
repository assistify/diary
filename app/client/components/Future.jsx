import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';

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
    <Container className="future">

      <Heading size={3}>Verfügbarkeit</Heading>
      <ul className="availabilities">
        {
        teamReport.map(memberReport => (
          <li key={memberReport.name}>
            {`${memberReport.name}: ${memberReport.future.availability}`}
          </li>
        ))
      }
      </ul>

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
