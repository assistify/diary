import React from 'react';
import { PropTypes } from 'prop-types';

import { TeamContext } from '../lib/teamContext';

export function DiscussItem(props) {
  function getReplyUrl(serverUrl, diaryChannel, title, authors) {
    let url = `${serverUrl}/create-thread?`;
    let paramCount = 0;
    if (diaryChannel) {
      paramCount++;
      url = `${url}${diaryChannel}`;
    }

    if (title) {
      paramCount++;
      url = `${url}${paramCount > 1 ? '&' : ''}message=${authors && authors.length > 0 ? `${authors.map(author => `&%40${author}`)}%0A%0A` : ''}>%20${title}%0A%0A`;
    }

    return (url);
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
          target="blank"
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
