import React, { Component } from 'react';
import dateFormat from 'dateformat';
import dailyType from '../../models/dailyType';
import MemberActivity from './MemberActivity';

export default class DiaryPage extends Component {
  static propTypes = dailyType;

  constructor(props) {
    super(props);

    this.date = props.date;
    this.teamName = props.teamName;
    this.activities = props.activities;
  }

  render() {
    return (
      <div className="diary-page">
        <h1 className="team-name">{this.teamName}</h1>
        <h2 className="date">{dateFormat(this.date, 'dddd, dd. mmmm')}</h2>
        {this.activities.map(activity => (
          <MemberActivity
            key={activity.name}
            name={activity.name}
            availability={activity.availability}
            workedOnItems={activity.workedOnItems}
            completedItems={activity.completedItems}
            blockingItems={activity.blockingItems}
            plannedItems={activity.plannedItems}
          />
        ))}
      </div>
    );
  }
}
