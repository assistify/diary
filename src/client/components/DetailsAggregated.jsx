import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';
import Container from 'react-bulma-components/lib/components/container';
import ActivityItems from './Activity';
import { memberReportType } from '../../models/memberReportType';

export default function DetailsAggregated(props) {
  const { teamReport } = props;

  const allPlannedItems = teamReport.reduce(
    (all, memberReport) => {
      const plannedBy = memberReport.statusKnown && memberReport.future.plannedItems
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
    const sameTitleItemIndex = aggregated.findIndex(aggregatedItem => aggregatedItem.title === item.title); // eslint-disable-line max-len
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

      <Heading size={3}>Was ansteht</Heading>

      {
        aggregatedItems.length > 0
          ? (
            <ActivityItems
              title="Geplante Tätigkeiten"
              list={aggregatedItems}
              className="next"
            />
          )
          : (
            <Box>
              <Container className="no-planned-activities">Bisher nichts geplant</Container>
            </Box>
          )
      }
    </Section>

  );
}

DetailsAggregated.propTypes = {
  teamReport: PropTypes.arrayOf(PropTypes.shape(memberReportType)).isRequired
};
