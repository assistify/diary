import { PropTypes } from 'prop-types';
import { activityItemType } from './activityItemType';

const memberReportType = {
  username: PropTypes.string.isRequired,
  past: PropTypes.shape({
    workingOnItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
    completedItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
    blockingItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
  }).isRequired,
  future: PropTypes.shape({
    availability: PropTypes.string.isRequired,
    plannedItems: PropTypes.arrayOf(PropTypes.shape(activityItemType)),
  })
};

export { memberReportType };
