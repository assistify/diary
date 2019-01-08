import React, { Component } from 'react';
import dateFormat from 'dateformat';

import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import { dailyType } from '../../models/dailyType';
import Availabilities from './Availability';
import DetailsAggregated from './DetailsAggregated';
import DetailsByMember from './DetailsByMember';

import isBlocked from '../lib/isBlocked';

export default class DiaryPage extends Component {
  static propTypes = dailyType;

  updateDate(dateString) {
    const { props: { updateValue } } = this;
    const date = new Date(dateString);
    if (!Number.isNaN(date)) {
      updateValue('date', date);
    }
  }

  render() {
    const {
      props: {
        updateValue,
        contentEditable,
        date,
        teamName,
        teamReport,
        serverUrl
      }
    } = this;

    function updateMember(username, fieldName, value) {
      updateValue('teamReport', teamReport.map((member) => {
        if (username === member.username) {
          const path = fieldName.split('.');
          let current = member;
          while (path.length > 1) {
            current = current[path.shift()];
          }
          current[path.shift()] = value;
        }
        return member;
      }));
    }

    const urlField = contentEditable && (
      <div
        className="serverUrl"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => updateValue('serverUrl', e.target.innerText)}
      >
        {serverUrl}
      </div>);

    return (
      <Container>
        <Hero className="diary-page" color="primary">
          <Hero.Body>
            {urlField}
            <Heading
              contentEditable={contentEditable}
              suppressContentEditableWarning
              className="team-name"
              onBlur={e => updateValue('teamName', e.target.innerHTML)}
            >
              {teamName}
            </Heading>
            <Heading
              subtitle
              className="date"
              contentEditable={contentEditable}
              suppressContentEditableWarning
              onBlur={e => this.updateDate(e.target.innerHTML)}
            >
              {dateFormat(date, 'dddd, dd. mmmm yyyy')}
            </Heading>
          </Hero.Body>
        </Hero>
        <Availabilities
          members={teamReport.map(memberReport => ({
            username: memberReport.username,
            availability: memberReport.future.availability,
            statusKnown: memberReport.statusKnown,
            blocked: isBlocked(memberReport.past.blockingItems)
          }))}
          contentEditable={contentEditable}
          updateValue={(username, fieldName, value) => updateMember(username, fieldName, value)}
        />
        <DetailsAggregated teamReport={teamReport} />
        <DetailsByMember
          teamReport={teamReport}
          contentEditable={contentEditable}
          updateValue={(username, fieldName, value) => updateMember(username, fieldName, value)}
        />
      </Container>
    );
  }
}
