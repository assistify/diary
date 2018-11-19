import React from 'react';
import { PropTypes } from 'prop-types';

export default function User(props) {
  const { username } = props;
  return (
    <a className="c-user" href="#">
      {`@${username}`}
    </a>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired
};
