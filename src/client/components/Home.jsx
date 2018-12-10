import React, { Component } from 'react';

import '../styles/index.scss';
import Container from 'react-bulma-components/lib/components/container';
import { decompressFromEncodedURIComponent as decode } from 'lz-string';

import qs from 'qs';
import { TeamContext } from '../lib/teamContext';
import DiaryPage from './DiaryPage';
import Editor from './Editor';
import { localization } from '../lib/localization';

import 'jsoneditor-react/es/editor.min.css';
import ReportFooter from './ReportFooter';

const templateData = {
  date: '2018-11-23T00:00:00.000Z',
  teamName: 'Assistify Core',
  serverUrl: 'https://team.assistify-test.noncd.db.de',
  teamReport: [
    {
      username: 'Template',
      statusKnown: true,
      past: {
        completedItems: [
          {
            title: 'Kurzbeschreibung',
            details: 'hier könnten Details reingeschrieben werden - diese werden derzeit aber noch nicht visualisiert',
          }
        ],
        workingOnItems: [
          {
            title: 'Kurzbeschreibung',
            details: 'hier könnten Details reingeschrieben werden - diese werden derzeit aber noch nicht visualisiert',
          },
        ],
        blockingItems: [
          {
            title: 'Kurzbeschreibung',
            details: 'hier könnten Details reingeschrieben werden - diese werden derzeit aber noch nicht visualisiert',
          },
        ],
      },
      future: {
        availability: 'da geht Freitext',
        plannedItems: [
          {
            title: 'Kurzbeschreibung',
            details: 'hier könnten Details reingeschrieben werden - diese werden derzeit aber noch nicht visualisiert',
          }
        ],
      },
    },
  ]
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    localization();

    this.state = {
      editing: false,
      diaryPage: { }// provided asynchronously in componentDidMount
    };
  }

  async componentDidMount() {
    const diaryPage = await this.getInitialDiaryPage();
    this.setState({ editing: false, diaryPage });
  }

  async getInitialDiaryPage() {
    const { location } = this.props;
    const { search } = location;
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true });

    // interpret query parameters
    if (queryParams.template === 'true') {
      return templateData;
    }

    if (queryParams.teamName) {
      let teamReport;
      try {
        const decodedTeamReport = await decode(queryParams.teamReport);
        teamReport = await JSON.parse(decodedTeamReport);
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        teamReport = [];
      }
      return {
        date: queryParams.date ? new Date(decode(queryParams.date)) : new Date(),
        teamName: decode(queryParams.teamName),
        serverUrl: queryParams.serverUrl ? decode(queryParams.serverUrl) : 'https://localhost:4000',
        teamReport,
      };
    }

    return {
      date: new Date(),
      teamName: 'Team Name',
      serverUrl: 'https://team-assistify-url',
      teamReport: [],
    };
  }

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  updateDiaryPage = (newState, url) => {
    // workaround for editing a date: convert if necessary
    if (typeof newState.date === 'string') {
      newState.date = new Date(newState.date); // eslint-disable-line no-param-reassign
    }
    window.history.pushState({}, '', url);
    this.setState({
      diaryPage: newState
    });
  }

  render() {
    const { diaryPage, editing } = this.state;

    if (!editing && diaryPage.teamName) {
      return (
        <Container>
          <TeamContext.Provider value={{
            teamName: diaryPage.teamName,
            serverUrl: diaryPage.serverUrl,
          }}
          >
            <DiaryPage
              date={diaryPage.date}
              teamName={diaryPage.teamName}
              teamReport={diaryPage.teamReport}
            />
          </TeamContext.Provider>
          <ReportFooter onClick={this.toggleEdit} />
        </Container>
      );
    }

    // we need to convert dates to strings in order to make them editable
    if (!diaryPage.date || typeof diaryPage.date !== 'string') {
      diaryPage.date = (diaryPage.date || new Date()).toJSON();
    }

    return (
      <Editor
        diaryPage={diaryPage}
        onChange={this.updateDiaryPage}
        onFooterClick={this.toggleEdit}
      />
    );
  }
}
