import React from "react";
import PropTypes from "prop-types";

const ConversationBubble = ({msg}) => {
  return (
    <div className="bubble">
      <span className="bubble-text">{msg}</span>
    </div>
  );
};

export default ConversationBubble;

ConversationBubble.propTypes = {
    msg: PropTypes.string.isRequired
}