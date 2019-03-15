import React from 'react';
import { PropTypes } from 'prop-types';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';
import UserFactsheet from './UserFactsheet';

import isBlocked from '../lib/isBlocked';
import BlockedIndication from './BlockedIndication';

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
          members
            .sort((a, b) => (a.statusKnown && !b.statusKnown ? -1
              : a.username > b.username))
            .map(member => (
              <Columns.Column
                key={member.username}
                size={4}
                className={member.statusKnown ? 'status-known' : 'status-unknown'}
              >
                <UserFactsheet
                  member={member}
                  contentEditable={contentEditable}
                  updateValue={updateValue}
                >
                  <Tag.Group>
                    {member.statusKnown && isBlocked(member.past.blockingItems)
                      && <BlockedIndication />
                    }
                    {member.statusKnown && member.future.availability
                      && (
                        <Tag
                          color="primary"
                          className="wrapped"
                          contentEditable={contentEditable}
                          suppressContentEditableWarning
                          onBlur={e => updateValue(member.username, 'future.availability', e.target.innerHTML)}
                        >
                          {member.future.availability}
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
    future: PropTypes.shape({
      availability: PropTypes.string,
      plannedItems: PropTypes.array
    }).isRequired,
    past: PropTypes.shape({
      completedItems: PropTypes.array,
      blockingItems: PropTypes.array
    }).isRequired
  })).isRequired,
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
