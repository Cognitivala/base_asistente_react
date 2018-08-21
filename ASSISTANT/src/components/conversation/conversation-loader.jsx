import React from "react";

const ConversationLoader = props => {
  if (props.active) {
    return (
      <div className="loader">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    );
  } else {
    return null;
  }
};

export default ConversationLoader;
