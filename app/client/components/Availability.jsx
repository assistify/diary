import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';

export default function Availabilities(props) {
  const {
    members
  } = props;
  return (
    <Container className="c-availabilities">
      <Heading size={3}>Verfügbarkeit</Heading>

      <ul>
        {
        members.map(member => (
          <li key={member.username}>
            {`${member.username}: ${member.availability}`}
          </li>
        ))
      }
      </ul>
    </Container>
  );
}

Availabilities.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    availability: PropTypes.string.isRequired,
  })).isRequired
};
