import React from 'react';
import { PropTypes } from 'prop-types';

import { TeamContext } from '../lib/teamContext';

export function DiscussItem(props) {
  function getReplyUrl(serverUrl, diaryChannel, title, authors) {
    const url = `${serverUrl}/create-thread`;
    const effectiveParams = [];

    if (diaryChannel) {
      effectiveParams.push(`parentChannel=${diaryChannel}`);
    }

    if (title) {
      let message = `> ${encodeURIComponent(title)}\n\n`;
      if (authors && authors.length > 0) {
        message += `${authors.map(author => `@${author} `)}`;
      }
      effectiveParams.push(`message=${encodeURIComponent(message)}`);
    }

    return `${url}?${effectiveParams.join('&')}`;
  }

  const {
    title,
    authors
  } = props;

  return (
    <TeamContext.Consumer>
      {teamContext => (
        <a
          className="discuss"
          rel="noopener noreferrer"
          target="_blank"
          href={getReplyUrl(teamContext.serverUrl, teamContext.diaryChannel, title, authors)}
        >
          <span role="img">↩</span>
        </a>
      )}
    </TeamContext.Consumer>
  );
}

DiscussItem.defaultProps = {
  title: '',
  authors: []
};

DiscussItem.propTypes = {
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string)
};
