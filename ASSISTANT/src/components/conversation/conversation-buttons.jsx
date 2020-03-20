import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import './conversation-buttons.css';

export default class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
  }

  sendButtonresponse(event) {

    const { generalStates } = this.props;
    const general = generalStates.toJS();
    // console.log(generalStates);
    // console.log('general:: ', general);

    const index = event.currentTarget.dataset.index;
    
    var element = document.getElementById(index);

    if (general.end_conversation) {
      console.log('end_conversation::>', true);
      element.classList.toggle("");
    } else{
      console.log('end_conversation::>', false);
      element.classList.toggle("botonActive");
    }

    const $item = event.target;
    const msg = $item.dataset.msg.toString();
    

    const conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false,
        // end_conversation: false
      };
    console.log('conversation:: ', conversation);
    this.props.updateConversationButton(conversation);
  }



  render() {
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        let idAux = uuidv4();
        return (
          <button id={idAux} data-index={idAux} key={i} className={mainCss.Btn + " " + mainCss.BtnBig} data-msg={map.get("value")} onClick={this.sendButtonresponse} >
            {map.get("title")}
          </button>
        );
      });

    return (
      <div className={mainCss.ConversationBubble+" "+mainCss.Buttons + " " + animation + send}>
        {botones}
      </div>
    );
  }
}

ConversationButtons.propTypes = {
  buttons: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  updateConversationButton: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired
};
