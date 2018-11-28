import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TeamContext } from '../lib/teamContext';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    const { username } = this.state;
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
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

User.contextType = TeamContext;
