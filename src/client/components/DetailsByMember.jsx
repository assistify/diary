import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';

import MemberReport from './MemberReport';
import { memberReportType } from '../../models/memberReportType';

export default function DetailsByMember(props) {
  const { teamReport, contentEditable, updateValue } = props;
  return (
    <Section className="c-past">
      <Heading size={3}>Was los war</Heading>
      <Columns centered multiline>
        {teamReport
          .sort((a, b) => (a.statusKnown && !b.statusKnown ? -1
            : a.username > b.username))
          .map(memberReport => (
            <MemberReport
              key={memberReport.username}
              username={memberReport.username}
              statusKnown={memberReport.statusKnown}
              plannedAvailability={memberReport.future.availability}
              past={memberReport.past}
              future={memberReport.future}
              contentEditable={contentEditable}
              updateValue={updateValue}
            />
          ))}
      </Columns>
    </Section>
  );
}

DetailsByMember.propTypes = {
  teamReport: PropTypes.arrayOf(PropTypes.shape(memberReportType)).isRequired,
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
