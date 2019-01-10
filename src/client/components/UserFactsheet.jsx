import React from 'react';
import { PropTypes } from 'prop-types';
import Media from 'react-bulma-components/lib/components/media';
import Heading from 'react-bulma-components/lib/components/heading';
import User from './User';
import Avatar from './Avatar';
import '../styles/components/UserFactSheet.scss';

export default class UserFactsheet extends React.Component {  // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
  }

  showConverter() {
    this.setState({ popupVisible: true });
  }

  render() {
    const {
      member,
      children,
      contentEditable,
      updateValue
    } = this.props;

    const statusKnownCheckbox = contentEditable && (
      <div className="statusKnownCheckbox">
        <input
          type="checkbox"
          checked={member.statusKnown}
          onChange={e => updateValue(member.username, 'statusKnown', e.target.checked)}
        />
        &nbsp;provided info
      </div>
    );

    const { popupVisible } = this.state;
    const popup = popupVisible && (
      <div className="popup">
        <textarea>{JSON.stringify(member, null, 2)}</textarea>
        <button type="button" onClick={() => this.setState({ popupVisible: false })}>Ok</button>
      </div>
    );

    const converterButton = member.statusKnown && (
      <button type="button" className="converterButton" onClick={() => this.showConverter()}>✎</button>
    );

    return (
      <Media>
        <Media.Item renderAs="figure" position="left">
          <Avatar username={member.username} />
        </Media.Item>

        <div className="factSheetInfo">
          { converterButton }
          <Heading size={5}>
            <User username={member.username} />
          </Heading>
          {statusKnownCheckbox}
          {children}
        </div>
        {popup}
      </Media>
    );
  }
}

UserFactsheet.defaultProps = {
  children: []
};

UserFactsheet.propTypes = {
  member: PropTypes.shape({
    username: PropTypes.string.isRequired,
    statusKnown: PropTypes.bool.isRequired,
    past: PropTypes.array.isRequired,
    future: PropTypes.array.isRequired
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
