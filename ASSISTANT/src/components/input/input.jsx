import React, { Component } from "react";
import ConversationLoader from "../conversation/conversation-loader";
import IsFetching from "../modules/is-fetching";
import InputAttach from "./input-attach";
import InputEmoji from "./input-emoji";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 0
    };
    this.input = React.createRef();
    this.submitMessage = this.submitMessage.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentWillReceiveProps() {
    this.focus();
  }

  focus() {
    setTimeout(() => {
      const input = this.input.current;
      input !== null ? input.focus() : null;
    }, 300);
  }

  updateMsg(event) {
    const start = event.target.selectionStart,
      end = event.target.selectionEnd,
      msg = event.target.value;
    this.setState({
      start,
      end
    });
  }

  updatePosition(event) {
    const start = event.target.selectionStart,
      end = event.target.selectionEnd;
    this.setState({
      start,
      end
    });
  }

  submitMessage(event) {
    event.preventDefault();
    const inputValue = this.input.current.value;
    if (inputValue.length > 0) {
      const { generalStates } = this.props,
        general = generalStates.toJS(),
        msg = inputValue,
        conversation = {
          general,
          msg: [msg],
          send: "to",
          enabled: true
        };
      this.props.updateConversation(conversation);
      this.input.current.value = "";
    }
  }

  fillAttach() {
    // Se comenta por que no se usará en el input
    const { customParamsStates, attachFile, generalStates } = this.props,
      attach = customParamsStates.getIn(["customParams", "settings", "attach"]);
    if (attach) {
      return (
        <InputAttach attachFile={attachFile} generalStates={generalStates} />
      );
    } else {
      return null;
     }
  }

  fillEmoji() {
    const { customParamsStates } = this.props,
      emoji = customParamsStates.getIn(["customParams", "settings", "emoji"]);
    if (emoji) {
      return <InputEmoji 
        start={this.state.start}
        end={this.state.end}
      />;
    } else {
      return null;
    }
  }

  render() {
    if (this.props.conversationsStates.get("loading")) {
      return (
        <ConversationLoader
          active={true}
          backgroundColor={this.props.customParamsStates.getIn([
            "customParams",
            "colorHeader"
          ])}
        />
      );
    } else if (!this.props.inputStates.get("enabled")) {
      return (
        <form className="input-user-holder" noValidate="">
          <div className="form-wrapp inactive" />
        </form>
      );
    } else {
      const {customParamsStates} = this.props,
      colorHeader = customParamsStates.getIn(["customParams","colorHeader"]);
      return (
        <IsFetching
          isFetching={this.props.inputStates.get("isFetching")}
          showChildren={true}
          colorHeader={colorHeader}
        >
          <form className="input-user-holder" noValidate="">
            <div className="form-wrapp">
              <input
                className="input-user"
                placeholder="Ingresa tu consulta..."
                name="message"
                onChange={this.updateMsg}
                onClickCapture={this.updatePosition}
                ref={this.input}
                tabIndex="0"
              />
              {this.fillAttach()}
              {this.fillEmoji()}
              <button
                id="button-send-msg"
                className="btn btn-rounded input-user-btn"
                aria-label="Enviar mensaje"
                onClick={this.submitMessage}
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </form>
        </IsFetching>
      );
    }
  }
}
