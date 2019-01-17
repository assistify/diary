import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Image from 'react-bulma-components/lib/components/image';
import { TeamContext } from '../lib/teamContext';

export default class Avatar extends Component {
    static propTypes = {
      username: PropTypes.string.isRequired,
      size: PropTypes.number,
    }

    static contextType = TeamContext;

    static defaultProps = {
      size: 128
    }

    constructor(props) {
      super(props);
      this.state = {
        username: props.username,
        size: props.size
      };
    }

    render() {
      const { username, size } = this.state;
      return (

        <TeamContext.Consumer>
          {teamContext => (
            <a
              href={`${teamContext.serverUrl}/direct/${username}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image size={size} className="avatar" alt={username} src={`${teamContext.serverUrl}/avatar/${username}`} fallback="http://bulma.io/images/placeholders/128x128.png" />
            </a>
          )}
        </TeamContext.Consumer>
      );
    }
}
