import React from 'react';
import { PropTypes } from 'prop-types';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import User from './User';
import { TeamContext } from '../lib/teamContext';


export default function UserFactsheet(props) {
  const { username, children } = props;
  return (
    <TeamContext.Consumer>
      {teamContext => (
        <Media>
          <Media.Item renderAs="figure" position="left">
            <Image size={128} className="avatar" alt={username} src={`${teamContext.serverUrl}/avatar/${username}`} fallback="http://bulma.io/images/placeholders/128x128.png" />
          </Media.Item>
          <Media.Item style={{ margin: 'auto' }}>
            <User username={username} />
            {children}
          </Media.Item>
        </Media>
      )}
    </TeamContext.Consumer>
  );
}

UserFactsheet.defaultProps = {
  children: []
};

UserFactsheet.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
