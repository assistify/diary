import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';
import UserFactsheet from './UserFactsheet';

export default function Availabilities(props) {
  const {
    members,
    contentEditable,
    updateValue
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
            <UserFactsheet
              username={member.username}
              statusKnown={member.statusKnown}
              contentEditable={contentEditable}
              updateValue={updateValue}
            >
              <Tag.Group>
                {member.statusKnown && member.blocked
                && <Tag className="blocked">Blockiert</Tag>
                }
                {member.statusKnown && member.availability
                && (
                <Tag
                  color="primary"
                  className="wrapped"
                  contentEditable={contentEditable}
                  suppressContentEditableWarning
                  onBlur={e => updateValue(member.username, 'future.availability', e.target.innerHTML)}
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
  })).isRequired,
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
