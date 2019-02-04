import React from 'react';
import { PropTypes } from 'prop-types';

import { JsonEditor } from 'jsoneditor-react';
import copyToClipboard from 'copy-to-clipboard';
import Button from 'react-bulma-components/lib/components/button';
import Container from 'react-bulma-components/lib/components/container';
import ReportFooter from './ReportFooter';
import { dailyType } from '../../models/dailyType';
import statefulUrl from '../lib/statefulUrl';

export default function Editor(props) {
  const copyStatefulUrlToClipboard = (params) => { // eslint-disable-line
    const url = statefulUrl.encode(params);
    copyToClipboard(url);
    return url;
  };

  const { diaryPage, onChange, onFooterClick } = props;

  return (
    <Container>
      <JsonEditor
        value={JSON.parse(JSON.stringify(diaryPage))}
        allowedModes={['tree', 'code', 'form', 'text']}
        onChange={state => onChange(state, copyStatefulUrlToClipboard(state))}
      />
      <Button className="js-copy-url-to-clipboard" onClick={() => copyStatefulUrlToClipboard(props.diaryPage)}>
        Copy diary page as URL
      </Button>
      <ReportFooter onClick={onFooterClick} />
    </Container>
  );
}

Editor.propTypes = {
  diaryPage: PropTypes.shape(dailyType).isRequired,
  onChange: PropTypes.func.isRequired,
  onFooterClick: PropTypes.func.isRequired,
};
