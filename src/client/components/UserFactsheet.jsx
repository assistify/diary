import React from 'react';
import { PropTypes } from 'prop-types';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import User from './User';
import Avatar from './Avatar';


export default function UserFactsheet(props) {
  const {
    username,
    children,
    statusKnown,
    contentEditable,
    updateValue
  } = props;

  const statusKnownCheckbox = contentEditable && (
    <div className="statusKnownCheckbox">
      <input
        type="checkbox"
        checked={statusKnown}
        onChange={e => updateValue(username, 'statusKnown', e.target.checked)}
      />
      &nbsp;provided info
    </div>
  );

  return (
    <Media>
      <Container>
        <Media.Item renderAs="figure" position="left">
          <Avatar username={username} />
        </Media.Item>
      </Container>

      <Container className="availablity">
        <Media.Item>
          <Heading size={5}>
            <User username={username} />
          </Heading>
          {statusKnownCheckbox}
          <Container>{children}</Container>
        </Media.Item>
      </Container>
    </Media>
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
  ]),
  statusKnown: PropTypes.bool.isRequired,
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
