import React, { Component } from 'react';
import dateFormat from 'dateformat';
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
      <div className="diary-page">
        <h1 className="team-name">{this.teamName}</h1>
        <h2 className="date">{dateFormat(this.date, 'dddd, dd. mmmm')}</h2>
        {this.teamReport.map(memberReport => (
          <MemberReport
            key={memberReport.name}
            name={memberReport.name}
            past={memberReport.past}
            future={memberReport.future}
          />
        ))}
      </div>
    );
  }
}
