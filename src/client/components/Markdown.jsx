import React from 'react';
import { PropTypes } from 'prop-types';

import md from 'markdown-it';
import emoji from 'markdown-it-emoji';

const markDown = md();
markDown.use(emoji);

function createMarkupInline(code) {
  return { __html: markDown.renderInline(code) };
}

function createMarkup(code) {
  return { __html: markDown.render(code) };
}

export default function Markdown(props) {
  const { code, withBreaks } = props;
  return (
    <span dangerouslySetInnerHTML={withBreaks // eslint-disable-line react/no-danger
      ? createMarkup(code)
      : createMarkupInline(code)
    }
    />
  );
}

Markdown.defaultProps = {
  withBreaks: false
};

Markdown.propTypes = {
  code: PropTypes.string.isRequired,
  withBreaks: PropTypes.bool
};
