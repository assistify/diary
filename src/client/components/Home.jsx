import React, { Component } from 'react';

import '../styles/index.scss';
import Container from 'react-bulma-components/lib/components/container';

import qs from 'qs';
import { TeamContext } from '../lib/teamContext';
import statefulUrl from '../lib/statefulUrl';
import DiaryPage from './DiaryPage';
import Editor from './Editor';
import { localization } from '../lib/localization';

import 'jsoneditor-react/es/editor.min.css';
import ReportFooter from './ReportFooter';

const contentEditable = !!window.location.search.match(/\bedit=/);

const templateData = {
  date: new Date(),
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
      diaryPage: templateData // will be overwritten with actual data in componentDidMount
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

    return statefulUrl.decode(queryParams);
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

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  updateValue(fieldname, value) {
    this.setState((currentState) => {
      const diaryPage = Object.assign(currentState.diaryPage, { [fieldname]: value });
      const edit = contentEditable ? '&edit=true' : '';
      window.history.pushState(null, '', `${statefulUrl.encode(diaryPage)}${edit}`);
      return { diaryPage };
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
              serverUrl={diaryPage.serverUrl}
              updateValue={(fieldname, value) => this.updateValue(fieldname, value)}
              contentEditable={contentEditable}
            />
          </TeamContext.Provider>
          <ReportFooter onClick={this.toggleEdit} />
        </Container>
      );
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
