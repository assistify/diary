import { PropTypes } from 'prop-types';
import activityType from './activityType';

const dailyType = {
  date: PropTypes.instanceOf(Date).isRequired,
  teamName: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(activityType),
};

export default dailyType;
