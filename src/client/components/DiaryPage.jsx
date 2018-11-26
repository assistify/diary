import React, { Component } from 'react';
import dateFormat from 'dateformat';

import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import { dailyType } from '../../models/dailyType';
import Future from './Future';
import Past from './Past';

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
            <Heading>
              {this.teamName}
            </Heading>
            <Heading subtitle className="date">
              {dateFormat(this.date, 'dddd, dd. mmmm')}
            </Heading>
          </Hero.Body>
        </Hero>
        <Future teamReport={this.teamReport} />
        <Past teamReport={this.teamReport} />
      </Container>
    );
  }
}