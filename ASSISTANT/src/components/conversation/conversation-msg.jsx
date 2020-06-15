import React, { Component } from "react";
import ConversationBubble from "./conversation-bubble";
import PropTypes from "prop-types";

export default class ConversationMsg extends Component {

  render() {
    const { msgs, animation, send, avatar, mainCss, tipoExtencion} = this.props,
    to = send === "to" ? true : false;

    return msgs.map((map, i) => {

      // console.log('msgs:: ', map);
      // // const extension = map.split('.').pop();
      // const extension = map.split('.');
      // const extensionDoc = extension[3];

      if(msgs._tail.array[0] === "exito_formulario" || msgs._tail.array[0] === "error_formulario" || msgs._tail.array[0] === ''){
        return null;
      }
      else if(to){
        return (
          <div
            key={i}
            className={
              mainCss.ConversationBubble + " " + animation + " " + mainCss.To
            }
          >
            <div/>
            <ConversationBubble msg={map} send={send} mainCss={mainCss}/>
            {/* <img
              className="rounded-img"
              src={send==="to"?userImg:avatar}
              alt="Respuesta"
            /> */}
          </div>
        );
      }else{
        
        return (
          <div key={i} className={mainCss.ConversationBubble + " " + animation + " " + mainCss.Send}>
            {/* <img
              className={mainCss.RoundedImg}
              src={send==="to"?userImg:avatar}
              alt=""
            /> */}
            <img className={mainCss.RoundedImg} src={avatar} alt="" />
              <ConversationBubble 
              // extensionDoc={extensionDoc} // Valida si un texto viene como URL
              tipoExtencion={tipoExtencion}
              msg={map} send={send} mainCss={mainCss}/>
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
  send: PropTypes.any,
  userImg: PropTypes.string,
  like: PropTypes.bool,
  last: PropTypes.bool,
  sendLike: PropTypes.func,
  mainCss: PropTypes.any.isRequired
};
