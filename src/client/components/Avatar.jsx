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
          {(teamContext) => {
            const src = window.location.hostname === 'localhost'
              ? `${window.location.origin.replace(4000, 4001)}/image/${encodeURIComponent(teamContext.serverUrl)}/avatar/${username}`
              : `${teamContext.serverUrl}/avatar/${username}`;
            return (
              <Image size={size} className="avatar" alt={username} src={src} fallback="http://bulma.io/images/placeholders/128x128.png" />
            );
          }}
        </TeamContext.Consumer>
      );
    }
}
