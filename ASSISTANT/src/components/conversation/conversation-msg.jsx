import React, { Component } from "react";
import ConversationBubble from "./conversation-bubble";
import PropTypes from "prop-types";
// import ConversationLikes from "./conversation-likes";

export default class ConversationMsg extends Component {

  render() {
    const { msgs, animation, send, avatar, colorHeader , userImg} = this.props,
    to = send==="to"?true:false;
    return msgs.map((map, i) => {
      if(to){
        return (
          <div
            key={i}
            className={
              "conversation-bubble " + animation + send
            }
          >
            <ConversationBubble msg={map} colorHeader={colorHeader} send={send}/>
            {/* <img
              className="rounded-img"
              src={send==="to"?userImg:avatar}
              alt="Respuesta"
            /> */}
          </div>
        );
      }else{
        return (
          <div
            key={i}
            className={
              "conversation-bubble " + animation + send
            }
          >
            <img
              className="rounded-img"
              src={send==="to"?userImg:avatar}
              alt=""
            />
            <ConversationBubble msg={map} colorHeader={colorHeader} send={send}/>
          </div>
        );
      }
    });
  }
}

ConversationMsg.propTypes = {
  animation: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  msgs: PropTypes.any.isRequired,
  send: PropTypes.any.isRequired,
  colorHeader: PropTypes.string.isRequired,
  userImg: PropTypes.string,
  like: PropTypes.bool,
  last: PropTypes.bool,
  sendLike: PropTypes.func
};
