import { PropTypes } from 'prop-types';
import { memberReportType } from './memberReportType';

const dailyType = {
  date: PropTypes.instanceOf(Date).isRequired,
  teamName: PropTypes.string.isRequired,
  teamReport: PropTypes.arrayOf(PropTypes.shape(memberReportType)),
};

export { dailyType };
