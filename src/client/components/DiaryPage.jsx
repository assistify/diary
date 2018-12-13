import React, { Component } from 'react';
import dateFormat from 'dateformat';

import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import { dailyType } from '../../models/dailyType';
import Availabilities from './Availability';
import DetailsAggregated from './DetailsAggregated';
import DetailsByMember from './DetailsByMember';

export default class DiaryPage extends Component {
  static propTypes = dailyType;

  constructor(props) {
    super(props);

    this.date = props.date;
    this.teamName = props.teamName;
    this.teamReport = props.teamReport;
  }

  render() {
    return (
      <Container>
        <Hero className="diary-page" color="primary">
          <Hero.Body>
            <Heading className="team-name">
              {this.teamName}
            </Heading>
            <Heading subtitle className="date">
              {dateFormat(this.date, 'dddd, dd. mmmm')}
            </Heading>
          </Hero.Body>
        </Hero>
        <Availabilities
          members={this.teamReport.map(memberReport => ({
            username: memberReport.username,
            availability: memberReport.future.availability,
            statusKnown: memberReport.statusKnown,
            blocked: memberReport.past.blockingItems && memberReport.past.blockingItems.length > 0
          }))}
        />
        <DetailsAggregated teamReport={this.teamReport} />
        <DetailsByMember teamReport={this.teamReport} />
      </Container>
    );
  }
}
