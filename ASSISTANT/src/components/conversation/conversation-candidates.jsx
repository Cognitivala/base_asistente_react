import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

import './conversation-buttons.css';

export default class ConversationCandidates extends Component {
  constructor(props) {
      super(props);
      // this.state = {
      //   selectButtons: []
      // };
      this.state = {
        selectedOption: '',
        totalOptions: 0,
        booleanOption: 0
      };
      this.sendButtonresponse = this.sendButtonresponse.bind(this);
      this.toggleSelectButton = this.toggleSelectButton.bind(this);
  }

  sendButtonresponse(event) {
    const { generalStates } = this.props,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [`{vote_id: ${this.state.selectedOption}, id_election: ${this.state.selectedOption}}`],
        send: "to",
        enabled: false
      };
      console.log(conversation);
    this.props.updateConversationButton(conversation);
  }

  toggleSelectButton(event) {
    this.setState({
      selectedOption: parseInt(event.target.value),
      booleanOption: (event.target.value ? 1 : 0)
    });
  }
  
  render() {
    let contador = 0;
    const { buttons, animation, send, mainCss } = this.props,

      botones = buttons.map((map, i) => {
        contador ++;
        let idAux = uuidv4();
        let cargo = map.get('cargo');
        let result_cargo = cargo.replace('<br>', '<br/>');

        return (
            <div className={mainCss.containerCandidates}
              key={i}
                // onClick={() => dispatch({ type: "select", item })}
                >
                <div className={mainCss.grid__col1}>
                    <input
                        key={ i *20}
                        button={ map }
                        type="radio"
                        className={ mainCss.option_input + " " + mainCss.radio }
                        name="postulantes"
                        value={ map.get("id_candidate") }
                        onChange={ this.toggleSelectButton }
                    />
                </div>
                <div className={mainCss.grid__col4}>
                  <h2>{ map.get("nombre")}</h2>
                  <p>{ result_cargo }</p>
                  <p>{ map.get("antiguedad") }</p>
                </div>

                <div className={mainCss.grid__col1}>
                    <i className={ map.get('sexo') == 'masculino' ? mainCss.IconMale : mainCss.IconFemale } />
                </div>
            </div>
        );
      }),

      botonSubmit = (
        <div className={mainCss.ConversationBubble+" "+mainCss.Buttons + " " + animation + send}>
          <button
                key={'emitir-voto'}
                className={mainCss.BtnVote}
                onClick={this.sendButtonresponse}
                disabled={this.state.booleanOption ? false : true }
              >
                Emitir mi Voto {`${this.state.booleanOption}/${contador}`}
            </button>
        </div>
      );

    return (
      <div className={mainCss.ConversationBubble+" "+mainCss.Buttons + " " + animation + send}>
        { botones }
        { botonSubmit }
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
