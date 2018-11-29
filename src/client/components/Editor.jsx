import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { JsonEditor } from 'jsoneditor-react';
import copyToClipboard from 'copy-to-clipboard';
import { compressToEncodedURIComponent as encode } from 'lz-string';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import ReportFooter from './ReportFooter';
import { dailyType } from '../../models/dailyType';


export default class Editor extends Component {
  static propTypes = {
    diaryPage: PropTypes.shape(dailyType).isRequired,
    onChange: PropTypes.func.isRequired,
    onFooterClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      diaryPage: props.diaryPage,
      onChange: props.onChange,
      onFooterClick: props.onFooterClick,
    };
  }

  copyStatefulUrlToClipboard = async () => {
    const { diaryPage } = this.state;
    const {
      teamName, date, serverUrl, teamReport
    } = diaryPage;
    const encodedTeamReport = await encode(JSON.stringify(teamReport));
    const url = `${window.location.origin}${window.location.pathname || '/'}`
      + `?teamName=${encode(teamName)}`
      + `&date=${encode(typeof date === 'string' ? date : date.toJSON())}`
      + `&serverUrl=${encode(serverUrl)}`
      + `&teamReport=${encodedTeamReport}`;
    copyToClipboard(url);
    return url;
  };

  render() {
    const { diaryPage, onChange, onFooterClick } = this.state;

    return (
      <Container>
        <JsonEditor
          value={diaryPage}
          allowedModes={['tree', 'code', 'form', 'text']}
          onChange={onChange}
        />
        <Button className="js-copy-url-to-clipboard" onClick={this.copyStatefulUrlToClipboard}>Copy diary page as URL</Button>
        <ReportFooter onClick={onFooterClick} />
      </Container>
    );
  }
}
