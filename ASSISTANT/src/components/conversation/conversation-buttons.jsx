import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux';
import {cleanAssistant} from '../../actions/index';
import { v4 as uuidv4 } from 'uuid';

import './conversation-buttons.css'

class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
    this.closeButtonresponse = this.closeButtonresponse.bind(this);
  }

  sendButtonresponse(event) {
    const index = event.currentTarget.dataset.index;
    var element = document.getElementById(index);
    element.classList.toggle("botonActive");

    const $item = event.target;
    const msg = $item.dataset.msg.toString();
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

  closeButtonresponse() {
    this.props.cleanAssistant();
  }

  render() {
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        let idAux = uuidv4();
        return (
          <button 
          id={idAux} data-index={idAux} 
          key={i} 
          className={mainCss.Btn + " " + mainCss.BtnBig} 
          data-msg={map.get("value")} 
          onClick={ map.get("value") === 'FINALIZAR' ? this.closeButtonresponse : this.sendButtonresponse}
            // onClick={this.sendButtonresponse}
          >
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

 export default ConversationButtons;
