import React from "react";
import PropTypes from "prop-types";

const ConversationButtons = ({ buttons, animation, send }) => {
  const botones = buttons.map((map, i) => {
    return (
      <button
        key={i}
        className="btn btn-big"
        data-msg={map.get("value")}
        data-func="sendButtonresponse"
      >
        {map.get("title")}
      </button>
    );
  });

  return (
    <div className={"conversation-bubble align-center " + animation + send}>{botones}</div>
  );
  //   return botones;
};

export default ConversationButtons;

ConversationButtons.propTypes = {
  buttons: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired
};
