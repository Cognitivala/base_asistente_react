import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationBubble extends Component {

  render() {
    const { msg, colorHeader, send } = this.props,
      style = { backgroundColor: colorHeader };
    if (send === "to") {
      return (
        <div className="bubble" style={style}>
          <span
            className="bubble-text"
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </div>
      );
    } else {
      return (
        <div className="bubble">
          <span
            className="bubble-text"
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </div>
      );
    }
  }
}

ConversationBubble.propTypes = {
  msg: PropTypes.any.isRequired,
  colorHeader: PropTypes.string.isRequired,
  send: PropTypes.any.isRequired
};
