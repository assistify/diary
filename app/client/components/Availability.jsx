import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';
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
          <Columns.Column
            key={member.username}
            size={4}
            className={member.statusKnown ? 'status-known' : 'status-unknown'}
          >
            <UserFactsheet username={member.username}>
              <Tag.Group>
                {member.blocked && <Tag className="blocked">Blockiert</Tag>}
                <Tag color="primary">{member.availability}</Tag>
              </Tag.Group>
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
    statusKnown: PropTypes.bool.isRequired,
    availability: PropTypes.string.isRequired,
    blocked: PropTypes.bool
  })).isRequired
};
