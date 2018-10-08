import React from "react";

const ConversationLoader = props => {
  if (props.active) {
    const style = {backgroundColor:props.backgroundColor}
    return (
      <div className="loader">
        <span className="dot" style={style}/>
        <span className="dot" style={style}/>
        <span className="dot" style={style}/>
      </div>
    );
  } else {
    return null;
  }
};

export default ConversationLoader;
