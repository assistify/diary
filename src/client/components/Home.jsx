import React, { Component } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';

import { PropTypes } from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import { compressToEncodedURIComponent as encode, decompressFromEncodedURIComponent as decode } from 'lz-string';

import '../styles/index.scss';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import Footer from 'react-bulma-components/lib/components/footer';

import qs from 'qs';
import { TeamContext } from '../lib/teamContext';
import DiaryPage from './DiaryPage';
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
      diaryPage: { } // provided asynchronously in componentDidMount
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
        console.error(e);
        teamReport = [];
      }
      return {
        date: queryParams.date || new Date(),
        teamName: queryParams.teamName,
        serverUrl: queryParams.serverUrl || 'https://localhost:3000',
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

  updateDiaryPage = (newState) => {
    // workaround for editing a date: convert if necessary
    if (typeof newState.date === 'string') {
      newState.date = new Date(newState.date);
    }
    this.setState({
      diaryPage: newState
    });
  }

    generateStatefulUrl = async () => {
      const { diaryPage } = this.state;
      const {
        teamName, date, serverUrl, teamReport
      } = diaryPage;
      const encodedTeamReport = await encode(JSON.stringify(teamReport));
      const url = `${window.location.origin}${window.location.pathname || '/'}?teamName=${teamName}`
      + `&date=${new Date(date).toJSON()}&serverUrl=${serverUrl}`
      + `&teamReport=${encodedTeamReport}`;
      copyToClipboard(url);
      const decompressed = await decode(encodedTeamReport);
      return url;
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
      return (
        <Container>
          <Editor
            value={diaryPage}
            allowedModes={['tree', 'code', 'form', 'text']}
            onChange={this.updateDiaryPage}
          />
          {/* <CopyToClipboard
          text={this.generateStatefulUrl()}
          onCopy={() => console.log('copied')}
        > */}
          <Button onClick={this.generateStatefulUrl}>Copy diary page as URL</Button>
          {/* </CopyToClipboard> */}
          <ReportFooter onClick={this.toggleEdit} />
        </Container>
      );
    }
}
