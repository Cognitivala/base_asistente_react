import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from 'react-redux';
import {cleanAssistant} from '../../actions/index';

class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
    this.closeButtonresponse = this.closeButtonresponse.bind(this);
    const { generalStates } = this.props;
    console.log('generalStates:: ', generalStates);
  }

  sendButtonresponse(event) {
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
    // console.log('closeButtonresponse');
    // dispatch({ type: "CLOSE_ASSISTANT" });
    this.props.cleanAssistant();
    // this.props.dispatch({ type: "SET_NOTIFICATION", data: null });
    // this.props.dispatch({ type: "ENABLED_INPUT" });
    // this.props.dispatch({ type: "ENABLED_HELP" });
    // dispatch({ type: "TOGGLE_MINIMIZED", data: false });
    // this.props.dispatch({ type: "OPEN_LAUNCHER" });
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

//  const mapDispatchToProps = (dispatch) => ({
//   cleanAssistant: () => dispatch(cleanAssistant()),
// })

 export default ConversationButtons;
//  export default connect(null, mapDispatchToProps)(ConversationButtons);
