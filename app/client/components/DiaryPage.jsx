import React, { Component } from 'react';
import dateFormat from 'dateformat';

import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Section from 'react-bulma-components/lib/components/section';

import MemberReport from './MemberReport';
import { dailyType } from '../../models/dailyType';

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
      <Section>
        <Hero className="diary-page">
          <Hero.Body>
            <Container>
              <Heading>
                {this.teamName}
              </Heading>
              <Heading subtitle className="date">
                {dateFormat(this.date, 'dddd, dd. mmmm')}
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
        <Container>
          <Columns centered multiline>
            {this.teamReport.map(memberReport => (
              <MemberReport
                key={memberReport.name}
                name={memberReport.name}
                past={memberReport.past}
                future={memberReport.future}
              />
            ))}
          </Columns>
        </Container>
      </Section>
    );
  }
}
