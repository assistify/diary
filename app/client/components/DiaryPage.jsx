import React, { Component } from 'react';
import dateFormat from 'dateformat';
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import { dailyType } from '../../models/dailyType';
import MemberReport from './MemberReport';

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
      <Box className="diary-page">
        <Heading>
          {this.teamName}
        </Heading>
        <Heading subtitle className="date">
          {dateFormat(this.date, 'dddd, dd. mmmm')}
        </Heading>
        <Tile kind="ancestor">
          <Tile size={8} vertical>
            {this.teamReport.map(memberReport => (
              <MemberReport
                key={memberReport.name}
                name={memberReport.name}
                past={memberReport.past}
                future={memberReport.future}
              />
            ))}
          </Tile>
        </Tile>
      </Box>
    );
  }
}
