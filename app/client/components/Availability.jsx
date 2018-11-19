import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Columns from 'react-bulma-components/lib/components/columns';
import User from './User';

export default function Availabilities(props) {
  const {
    members
  } = props;
  return (
    <Container className="c-availabilities">
      <Heading size={3}>Verfügbarkeit</Heading>

      <Columns multiline centered>
        {
        members.map(member => (
          <Columns.Column size={3}>
            <Media>
              <Media.Item renderAs="figure" position="left">
                <Image renderAs="p" size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
              </Media.Item>
              <Media.Item>
                <User username={member.username} />
                <p>{member.availability}</p>
              </Media.Item>
            </Media>
          </Columns.Column>
        ))
      }
      </Columns>
    </Container>
  );
}

Availabilities.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
  })).isRequired
};
