import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TeamContext } from '../lib/teamContext';

export default class User extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  static contextType = TeamContext;

  constructor(props) {
    super(props);
    this.state = {
      username: props.username
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
