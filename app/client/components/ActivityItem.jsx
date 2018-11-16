import React from 'react';
import { PropTypes } from 'prop-types';
import { itemType } from '../../models/activityType';

function ActivityItem(props) {
  const { title } = props;
  return (
    <li>{title}</li>
  );
}

ActivityItem.propTypes = itemType;

export default function ActivityItems(props) {
  const { title, list, className } = props;
  return (
    <div className={className}>
      <h4>{title}</h4>
      { list.length > 0
        ? (
          <ul>
            {list.map(item => (
              <ActivityItem
                key={item.title}
                title={item.title}
              />
            ))}
          </ul>
        )
        : <div className="empty-items">nüscht</div>
        }
    </div>
  );
}

ActivityItems.defaultProps = {
  list: [],
};

ActivityItems.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(itemType),
  className: PropTypes.string.isRequired
};
