import React, { Component } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import { PropTypes } from 'prop-types';

import '../styles/index.scss';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import Footer from 'react-bulma-components/lib/components/footer';

import { TeamContext } from '../lib/teamContext';
import DiaryPage from './DiaryPage';
import qs from 'qs';
import { localization } from '../lib/localization';

import 'jsoneditor-react/es/editor.min.css';

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
        workedOnItems: [
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

function ReportFooter(props) {
  const { onClick } = props;
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <Button onClick={onClick}>
            Made with ❤ by the Assistify Team
          </Button>
        </Content>
      </Container>
    </Footer>
  );
}
ReportFooter.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    localization();

    this.state = {
        editing: false,
        diaryPage: {
        date: new Date(),
        teamName: 'Team Name',
        serverUrl: 'https://team-assistify-url',
        teamReport: [],
      },
    };
  }

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  updateDiaryPage = (newState) => {
    // workaround for editing a date: convert if necessary
    if(typeof newState.date === 'string') {
      newState.date = new Date(newState.date);
    }
    this.setState({
      diaryPage: newState
    });
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true });

    if(queryParams.template){
      this.updateDiaryPage(templateData);
      this.toggleEdit();
    }
  }

  render() {
    const { diaryPage, editing } = this.state;

    if (!editing) {
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
    return (
      <Container>
        <Editor
          value={diaryPage}
          allowedModes={['tree', 'code', 'form', 'text']}

          onChange={this.updateDiaryPage}
        />
        <ReportFooter onClick={this.toggleEdit} />
      </Container>
    );
  }
}
