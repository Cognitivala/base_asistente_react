import React, { Component } from "react";
import ConversationBubble from "./conversation-bubble";
import PropTypes from "prop-types";

export default class ConversationMsg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { msgs, animation, send, avatar } = this.props;

    return msgs.map((map, i) => {
      return (
        <div
          key={i}
          className={
            "conversation-bubble " + animation + send
          }
        >
          <img
            className="rounded-img response-img"
            src={avatar}
            alt="Respuesta"
          />
          <ConversationBubble msg={map} />
        </div>
      );
    });
  }
}

ConversationMsg.propTypes = {
  animation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  msgs: PropTypes.any.isRequired,
  send: PropTypes.string.isRequired
};
