import React, { Component } from 'react';
import dateFormat from 'dateformat';

import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';

import html2canvas from 'html2canvas';

import { dailyType } from '../../models/dailyType';
import Availabilities from './Availability';
import DetailsAggregated from './DetailsAggregated';
import DetailsByMember from './DetailsByMember';

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

    function downloadScreenshot(button) {
      const width = 1440;
      const options = {
        windowWidth: width * 2,
        width,
        scale: 1,
        x: width / 2
      };
      button.setAttribute('style', 'display: none');
      html2canvas(document.getElementById('app'), options)
        .then((canvas) => {
          const prefix = 'data:application/octet-stream;headers=Content-Disposition%3Aattachment%3Bfilename=diary.png';
          window.location.href = canvas.toDataURL('image/png').replace(/data:image\/png/, prefix);
          button.removeAttribute('style');
        });
    }

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
          <button id="screenshot-button" type="button" onClick={e => downloadScreenshot(e.target)}>
            <span role="img" aria-label="Take Screenshot">📷</span>
          </button>
        </Hero>
        <Availabilities
          members={teamReport}
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
