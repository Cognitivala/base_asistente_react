import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import './conversation-buttons.css';

export default class ConversationCandidates extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
  }

  sendButtonresponse(event) {
    const { generalStates } = this.props;
    const general = generalStates.toJS();
    const index = event.currentTarget.dataset.index;
    var element = document.getElementById(index);
        element.classList.toggle("botonActive");
    const $item = event.target;
    const msg = $item.dataset.msg.toString();
    const conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false,
        // end_conversation: false
      };
    // console.log('conversation:: ', conversation);
    this.props.updateConversationButton(conversation);
  }
  render() {
    const { buttons, animation, send, mainCss } = this.props,
      botones = buttons.map((map, i) => {
        let idAux = uuidv4();
        return (
            <div className={mainCss.containerCandidates}
                // onClick={() => dispatch({ type: "select", item })}
                >
                <div className={mainCss.grid__col1}>
                    <input
                        type="radio"
                        className={mainCss.option_input + " " + mainCss.radio}
                        name="test"
                        
                        // onChange={validateFunc.bind(this, validate, name)}
                    />
                </div>
                <div className={mainCss.grid__col4}>
                  <h2>Andrea Palazuelo</h2>
                  <p>Gerente BU<br/>Business Unit Salud</p>
                  <p>1 año y 8 meses de antiguedad</p>
                </div>

                <div className={mainCss.grid__col1}>
                    <i className={mainCss.IconUser} />
                </div>
            </div>
        );
      });

    return (
      <div className={mainCss.ConversationBubble+" "+mainCss.Buttons + " " + animation + send}>
        {botones}
      </div>
    );
  }
}
ConversationCandidates.propTypes = {
  buttons: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  updateConversationButton: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired
};
