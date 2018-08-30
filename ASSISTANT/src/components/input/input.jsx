import React, { Component } from "react";
import ConversationLoader from "../conversation/conversation-loader";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
    this.input = React.createRef();
    this.submitMessage = this.submitMessage.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
  }

  componentWillReceiveProps(){
    this.focus();
  }

  focus(){
    setTimeout(() => {      
      const input = this.input.current;
      input!==null?input.focus():null
    }, 300);
  }

  updateMsg(event) {
    this.setState({ msg: event.target.value });
  }

  submitMessage(event) {
    event.preventDefault();
    const { generalStates } = this.props,
      general = generalStates.toJS(),
      msg = this.state.msg,
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: true
      };
    this.props.updateConversation(conversation);
    this.setState({ msg: "" });
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
      return (
        <form className="input-user-holder" noValidate="">
          <div className="form-wrapp">
            <input
              className="input-user"
              placeholder="Ingresa tu consulta..."
              name="message"
              onChange={this.updateMsg}
              value={this.state.msg}
              ref={this.input}
              tabIndex="0"
            />
            <button
              id="button-send-msg"
              className="btn btn-rounded input-user-btn"
              aria-label="Enviar mensaje"
              style={{ color: "rgb(51, 51, 51)" }}
              onClick={this.submitMessage}
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </form>
      );
    }
  }
}
