
import { PropTypes } from 'prop-types';
import { activityItemType } from './activityItemType';

const futureType = {
  availability: PropTypes.string.isRequired,
  plannedItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
  blocked: PropTypes.bool.isRequired
};

export { futureType };
