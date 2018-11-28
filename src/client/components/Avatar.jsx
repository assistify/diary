import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Image from 'react-bulma-components/lib/components/image';
import { TeamContext } from '../lib/teamContext';

export default class Avatar extends Component {
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
          {teamContext => (
            <Image size={128} className="avatar" alt={username} src={`${teamContext.serverUrl}/avatar/${username}`} fallback="http://bulma.io/images/placeholders/128x128.png" />
          )}
        </TeamContext.Consumer>
      );
    }
}
