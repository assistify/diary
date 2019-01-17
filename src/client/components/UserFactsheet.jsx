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

  getTextRepresentation() {
    const {
      member: {
        past,
        future
      }
    } = this.props;
    return [
      '**An was hast Du gearbeitet?**',
      (past.completedItems || []).map(e => `- ${e.title}`).join('\n'),
      '\n**Was möchtest Du als nächstes tun?**',
      (future.plannedItem || []).map(e => `- ${e.title}`).join('\n'),
      '\n**Wobei benötigst Du Hilfe?**',
      (past.blockingItems || []).map(e => `- ${e.title}`).join('\n'),
      '\n**Wo verbringst Du Deinen nächsten Arbeitstag?**',
      future.availability,
    ].join('\n');
  }

  popupTextChanged(text) {
    const { member, updateValue } = this.props;
    const past = {
      completedItems: [],
      blockingItems: []
    };
    const future = {
      availability: [],
      plannedItems: []
    };
    let section;
    text.split('\n').forEach((line) => {
      if (line.match(/An was hast Du gearbeitet/)) {
        section = past.completedItems;
      } else if (line.match(/Was möchtest Du als nächstes tun/)) {
        section = future.plannedItems;
      } else if (line.match(/Wobei benötigst Du Hilfe/)) {
        section = past.blockingItems;
      } else if (line.match(/Wo verbringst Du Deinen nächsten Arbeitstag/)) {
        section = future.availability;
      } else if (section && line.trim()) {
        section.push({ title: line.replace(/^[\s-]*/, '') });
      }
    });
    future.availability = future.availability.map(item => item.title).join('\n') || 'unbekannt';
    updateValue(member.username, 'past', past);
    updateValue(member.username, 'future', future);
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
        <div>
          <textarea
            onChange={e => this.popupTextChanged(e.target.value)}
            value={this.getTextRepresentation(member)}
          />
          <button type="button" onClick={() => this.setState({ popupVisible: false })}>Ok</button>
        </div>
      </div>
    );

    const converterButton = contentEditable && (
      <button
        type="button"
        className="converterButton"
        onClick={() => {
          updateValue(member.username, 'statusKnown', true); // once someone edits the text, it's because a status is known
          this.setState({
            popupVisible: true
          });
        }}
      >
        ✎
      </button>
    );

    return (
      <Media>
        <Media.Item renderAs="figure" position="left">
          <Avatar
            username={member.username}
            size={member.statusKnown ? 128 : 64}
          />
        </Media.Item>

        <div className="factSheetInfo">
          {converterButton}
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
    future: PropTypes.shape({
      availability: PropTypes.string,
      plannedItems: PropTypes.array
    }).isRequired,
    past: PropTypes.shape({
      completedItems: PropTypes.array,
      blockingItems: PropTypes.array
    }).isRequired
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  contentEditable: PropTypes.bool.isRequired,
  updateValue: PropTypes.func.isRequired
};
