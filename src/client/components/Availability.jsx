import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Tag from 'react-bulma-components/lib/components/tag';
import UserFactsheet from './UserFactsheet';

export default function Availabilities(props) {
  const {
    members
  } = props;

  return (
    <Section className="c-availabilities">
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
              <Tag.Group renderAs="div">
                {member.statusKnown && member.blocked
                && <Tag className="blocked">Blockiert</Tag>
                }
                {member.statusKnown && member.availability
                && (
                <Tag
                  renderAs="div"
                  color="primary"
                  className="wrapped"
                >
                  {member.availability}
                </Tag>
                )
                }
              </Tag.Group>
            </UserFactsheet>
          </Columns.Column>
        ))
      }
      </Columns>
    </Section>
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
