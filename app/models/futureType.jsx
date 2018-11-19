
import { PropTypes } from 'prop-types';
import { activityItemType } from './activityItemType';

const futureType = {
  availability: PropTypes.string.isRequired,
  plannedItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
};

export { futureType };
