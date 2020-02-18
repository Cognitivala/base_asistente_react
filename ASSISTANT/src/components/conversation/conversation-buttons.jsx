import React, { Component } from "react";
import PropTypes from "prop-types";
import {cleanAssistant} from '../../actions/index';

export default class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
  }

  sendButtonresponse(event) {
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

  closeButtonresponse(event) {
    console.log('closeButtonresponse');

    this.props.dispatch(cleanAssistant())
  }

  render() {
    console.log('botones...');
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        return (
          <button
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
