import React from 'react';
import { PropTypes } from 'prop-types';

import md from 'markdown-it';
import emoji from 'markdown-it-emoji';

const markDown = md();
markDown.use(emoji);

export default function Markdown(props) {
  function handleMentions(code) {
    return code.replace(/@(\w+)/g, (match) => {
      const name = match.replace(/^@/, '');
      return `[${match}](${props.serverUrl}direct/${name})`;
    });
  }

  function createMarkupInline(code) {
    return { __html: markDown.renderInline(handleMentions(code)) };
  }

  function createMarkup(code) {
    return { __html: markDown.render(handleMentions(code)) };
  }

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
  withBreaks: PropTypes.bool,
  serverUrl: PropTypes.string.isRequired
};
