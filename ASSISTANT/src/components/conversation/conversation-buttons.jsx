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

    //Bloquea botones
    $item.parentElement.className += " bloqued";

    //Ve si está en un formulario o modal
    // if (
    //   !$item.parentElement === document.getElementsByClassName("close-form")[0]
    // ) {
    //   $item.parentElement.remove();
    // }

    //Envia mensaje
    const conversation = { msg: [msg], send: "to" };
    this.props.updateConversationButton(conversation);
  }

  render() {
    const { buttons, animation, send, colorHeader } = this.props,
      style = { backgroundColor: colorHeader },
      botones = buttons.map((map, i) => {
        return (
          <button
            key={i}
            className="btn btn-big"
            data-msg={map.get("value")}
            onClick={this.sendButtonresponse}
            style={style}
          >
            {map.get("title")}
          </button>
        );
      });

    return (
      <div className={"conversation-bubble align-center " + animation + send}>
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
  colorHeader: PropTypes.string.isRequired
};
