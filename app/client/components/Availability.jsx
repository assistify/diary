import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import UserFactsheet from './UserFactsheet';

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
          <Columns.Column key={member.username} size={3}>
            <UserFactsheet username={member.username}>
              <p>{member.availability}</p>
            </UserFactsheet>
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
