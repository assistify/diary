import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { JsonEditor } from 'jsoneditor-react';
import copyToClipboard from 'copy-to-clipboard';
import { compressToEncodedURIComponent as encode } from 'lz-string';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import ReportFooter from './ReportFooter';
import { dailyType } from '../../models/dailyType';


export default function Editor(props) {
  const copyStatefulUrlToClipboard = async () => {
    const { diaryPage } = props;
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

  const { diaryPage, onChange, onFooterClick } = props;

  const copyOnFooterClick = async () => {
    await copyStatefulUrlToClipboard();
    return onFooterClick(); // has to be this order since onFooterClick will manipulate the state
  };

  return (
    <Container>
      <JsonEditor
        value={diaryPage}
        allowedModes={['tree', 'code', 'form', 'text']}
        onChange={onChange}
      />
      <Button className="js-copy-url-to-clipboard" onClick={copyStatefulUrlToClipboard}>Copy diary page as URL</Button>
      <ReportFooter onClick={copyOnFooterClick} />
    </Container>
  );
}

Editor.propTypes = {
  diaryPage: PropTypes.shape(dailyType).isRequired,
  onChange: PropTypes.func.isRequired,
  onFooterClick: PropTypes.func.isRequired,
};
