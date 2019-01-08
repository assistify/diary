import { PropTypes } from 'prop-types';

export const activityItemType = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string,
  owners: PropTypes.arrayOf(PropTypes.string),
  contentEditable: PropTypes.bool,
  updateValue: PropTypes.func
};
