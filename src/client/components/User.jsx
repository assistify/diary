import React from 'react';
import { PropTypes } from 'prop-types';
import { TeamContext } from '../lib/teamContext';

export default function User(props) {
  const { username } = props;
  return (
    <TeamContext.Consumer>
      { teamContext => (
        <a
          className="c-user"
          href={`${teamContext.serverUrl}/direct/${username}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {`@${username}`}
        </a>
      )}
    </TeamContext.Consumer>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

User.contextType = TeamContext;
