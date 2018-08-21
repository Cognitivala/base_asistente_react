import React, { Component } from "react";
import ConversationLoader from "../conversation/conversation-loader";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
  }

  updateMsg(event){
    this.setState({msg:event.target.value});
  }

  submitMessage(event) {
    event.preventDefault();
    const msg = this.state.msg,
    conversation = {msg:[msg],send:"to"};
    if(msg.length>0){
      this.props.updateConversation(conversation);
      this.setState({msg:""});
    }
  }

  render() {
    if(this.props.conversationsStates.get('loading')){
      return <ConversationLoader active={true}/>;
    }else{
      return (
        <form className="input-user-holder" noValidate="">
          <div className="form-wrapp">
            <input
              className="input-user"
              placeholder="Ingresa tu consulta..."
              name="message"
              onChange={this.updateMsg}
              value={this.state.msg}
              autoFocus={true}
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
