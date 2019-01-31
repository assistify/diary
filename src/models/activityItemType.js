import { PropTypes } from 'prop-types';

export const activityItemType = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string,
  owners: PropTypes.arrayOf(PropTypes.string),
  displayOwners: PropTypes.bool,
  contentEditable: PropTypes.bool,
  updateValue: PropTypes.func
};
