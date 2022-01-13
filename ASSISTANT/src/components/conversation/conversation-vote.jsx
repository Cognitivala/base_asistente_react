import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import './conversation-buttons.css';

export default class ConversationVote extends Component {
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
            <div className={mainCss.containerVote}>

                <div className={mainCss.grid__col12}>
                  <h1>Votación Comité Paritario Nº5</h1>
                </div>
                <div className={mainCss.grid__col12}>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
                </div>

                <div className={mainCss.grid__col1}>
                    <i className={mainCss.IconUser} />
                </div>
                <div className={mainCss.grid__col11}>
                  <h2>5 candidatos</h2>
                </div>

                <div className={mainCss.grid__col1}>
                    <i className={mainCss.IconCalendar} />
                </div>

                <div className={mainCss.grid__col11 + " " + mainCss.final}>
                  <p>Finaliza en 3 días <span>En curso</span></p>
                </div>

                <div className={mainCss.grid__col11 + " " + mainCss.date} >
                  2021/11/02 - 2021/11/06
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
ConversationVote.propTypes = {
  buttons: PropTypes.any.isRequired,
  animation: PropTypes.string.isRequired,
  send: PropTypes.string.isRequired,
  updateConversationButton: PropTypes.func.isRequired,
  generalStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired
};
