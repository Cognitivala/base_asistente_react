import React, { Component } from "react";
import PropTypes from "prop-types";

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

  render() {
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        console.log('map.get("value"):: ', map.get("value"));
        console.log('map.get("title"):: ', map.get("title"));
        return (
          <button
            key={i}
            className={'buttonLarge ' + mainCss.Btn + " " + mainCss.BtnBig}
            data-msg={map.get("value")}
            onClick={this.sendButtonresponse}
            style={ map.get("title") === 'SI' || map.get("title") === 'NO' ? { width: 'auto'}  : { width:'100%'} }
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
