import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';

import { activityItemType } from '../../models/activityItemType';
import MarkDown from './Markdown';
import User from './User';

import { TeamContext } from '../lib/teamContext';
import { DiscussItem } from './DiscussItem';

function ActivityItem(props) {
  const {
    title, owners, contentEditable, updateValue
  } = props;

  const separator = <Fragment>,&nbsp;</Fragment>;
  const listOfOwners = owners && (
    <span>
      &nbsp;(
      {owners.map((owner, i) => (
        <span key={owner}>
          {i > 0 ? separator : ''}
          <User username={owner} />
        </span>
      ))}
      )
    </span>
  );

  return (
    <li key={title}>
      <TeamContext.Consumer>
        {teamContext => (
          <span>
            <MarkDown
              contentEditable={contentEditable}
              updateValue={updateValue}
              code={title || ''}
              serverUrl={teamContext.serverUrl}
            />

            <DiscussItem
              title={title}
              author={owners}
            />
          </span>
        )}
      </TeamContext.Consumer>
      {listOfOwners}
    </li>
  );
}

ActivityItem.defaultProps = {
  owners: null
};

ActivityItem.propTypes = activityItemType;

export default function ActivityItems(props) {
  const {
    title, list, className, contentEditable, updateValue
  } = props;

  const titledItems = list.filter(item => item.title);

  return titledItems.length > 0 && (
    <Box className={`c-activities ${className}`}>
      <Heading size={6}>{title}</Heading>
      {titledItems.length > 0
        ? (
          <ul>
            {titledItems.map((item, liIndex) => (
              <ActivityItem
                key={item.title}
                title={item.title}
                details={item.details}
                owners={item.owners}
                contentEditable={contentEditable}
                updateValue={content => updateValue(liIndex, content)}
              />
            ))}
            {contentEditable
            && (
              <ActivityItem
                title=" "
                contentEditable
                updateValue={content => updateValue(titledItems.length, content)}
              />
            )}
          </ul>
        )
        : <div className="empty-items">-</div>
      }
    </Box>
  );
}

ActivityItems.defaultProps = {
  list: [],
};

ActivityItems.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
  className: PropTypes.string.isRequired,
  contentEditable: PropTypes.bool,
  updateValue: PropTypes.func
};
