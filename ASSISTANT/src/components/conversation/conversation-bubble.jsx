import React from "react";
import PropTypes from "prop-types";

const ConversationBubble = ({msg, colorHeader,send}) => {
  const style = { backgroundColor:colorHeader };
  if(send==="to"){
    return (
      <div className="bubble" style={style}>
        <span className="bubble-text">{msg}</span>
      </div>
    );
  }else{
    return (
      <div className="bubble">
        <span className="bubble-text">{msg}</span>
      </div>
    );
  }
};

export default ConversationBubble;

ConversationBubble.propTypes = {
    msg: PropTypes.string.isRequired,
    colorHeader: PropTypes.string.isRequired,
    send: PropTypes.string.isRequired
}