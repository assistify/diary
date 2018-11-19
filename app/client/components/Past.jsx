import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import MemberReport from './MemberReport';

export default function Past(props) {
  const { teamReport } = props;
  return (
    <Section className="c-past">
      <Heading size={3}>Was los war</Heading>
      <Columns centered multiline>
        {teamReport.map(memberReport => (
          <MemberReport
            key={memberReport.username}
            username={memberReport.username}
            plannedAvailability={memberReport.future.availability}
            past={memberReport.past}
          />
        ))}
      </Columns>
    </Section>
  );
}
