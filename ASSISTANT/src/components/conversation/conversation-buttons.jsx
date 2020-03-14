import React, { Component } from "react";
import PropTypes from "prop-types";

import './conversation-buttons.css';

export default class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
  }

  sendButtonresponse(event) {
    const index = event.currentTarget.dataset.index;
    console.log('INDEX: ', index);

    var element = document.getElementById(index);
    element.classList.toggle("botonActive");

    const $item = event.target,
      msg = $item.dataset.msg.toString();
    const { generalStates } = this.props,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false
      };
    this.props.updateConversationButton(conversation);
  }



  render() {
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        return (
          <button id={i} data-index={i} key={i} className={mainCss.Btn + " " + mainCss.BtnBig} data-msg={map.get("value")} onClick={this.sendButtonresponse} >
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
