import React from 'react';
import { PropTypes } from 'prop-types';

import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import Content from 'react-bulma-components/lib/components/content';

import Container from 'react-bulma-components/lib/components/container';
import { activityItemType } from '../../models/activityItemType';
import MarkDown from './Markdown';
import User from './User';

function ActivityItem(props) {
  const { title, owners } = props;
  return (
    <li key={title}>
      <MarkDown code={title} />
      {owners
        && (
          <Container renderAs="span">
            <Content renderAs="span">&nbsp;(</Content>
            {owners.map((owner, i) => (
              <Container key={owner} renderAs="span">
                <User username={owner} />
                {owners.length > 1 && i !== (owners.length - 1)
            && <Content renderAs="span">,&nbsp;</Content>
            }
              </Container>
            ))}
            <Content renderAs="span">)</Content>
          </Container>
        )
    }
    </li>
  );
}

ActivityItem.defaultProps = {
  owners: null
};

ActivityItem.propTypes = activityItemType;

export default function ActivityItems(props) {
  const {
    title, list, className
  } = props;
  return list.length > 0 && (
    <Box className={`c-activities ${className}`}>
      <Heading size={6}>{title}</Heading>
      { list.length > 0
        ? (
          <ul>
            {list.map(item => (
              <ActivityItem
                key={item.title}
                title={item.title}
                details={item.details}
                owners={item.owners}
              />
            ))}
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
  className: PropTypes.string.isRequired
};
