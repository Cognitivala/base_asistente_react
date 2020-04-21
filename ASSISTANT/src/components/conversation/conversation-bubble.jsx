import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationBubble extends Component {

  render() {
    const { msg, send, mainCss } = this.props;
    if(msg === "exito_formulario") {
      return null;
    }
    if (send === "to") {
      return (
        <div className={mainCss.Bubble}>
          <span
            className={mainCss.BubbleText}
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </div>
      );
    } else {
      return (
        <div className={mainCss.Bubble}>
          <span
            className={mainCss.BubbleText}
            dangerouslySetInnerHTML={{ __html: msg }}
          />
        </div>
      );
    }
  }
}

ConversationBubble.propTypes = {
  msg: PropTypes.any.isRequired,
  send: PropTypes.any,
  mainCss: PropTypes.any.isRequired
};
