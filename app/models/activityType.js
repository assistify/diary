import { PropTypes } from 'prop-types';

const itemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  details: PropTypes.string,
});

const activityType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  workedOnItems: PropTypes.arrayOf(itemType),
  completedItems: PropTypes.arrayOf(itemType),
  blockingItems: PropTypes.arrayOf(itemType),
  plannedItems: PropTypes.arrayOf(itemType),
});

export default activityType;

export { activityType, itemType };
