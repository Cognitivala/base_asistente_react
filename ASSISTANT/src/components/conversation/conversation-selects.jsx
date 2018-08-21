import React, { Component } from "react";

export default class ConversationSelects extends Component {
  constructor(props) {
    super(props);
  }
  
  //Si es la última se le aplica la animación
  render() {
    if (this.props.last) {
      return (
        <div
          className={
            "conversation-bubble animated-av fadeInUp-av " + this.props.send
          }
        >
          <img
            className="rounded-img response-img"
            src={this.props.avatar}
            alt="Respuesta"
          />
          <div className="bubble">
            <span className="bubble-text"> {this.props.msg} </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"conversation-bubble " + this.props.send}>
          <img
            className="rounded-img response-img"
            src={this.props.avatar}
            alt="Respuesta"
          />
          <div className="bubble">
            <span className="bubble-text"> {this.props.msg} </span>
          </div>
        </div>
      );
    }
  }
}
