import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationButtons extends Component {
  constructor(props) {
    super(props);
    this.sendButtonresponse = this.sendButtonresponse.bind(this);
  }

  componentWillMount() {
    if (this.props.last) {
      const { ayudaStates, inputStates, customParamsStates } = this.props,
        help = customParamsStates.getIn(["customParams", "settings", "help"]);
      if (help && ayudaStates.get("open")) this.props.closeHelp();
      if (help && ayudaStates.get("enabled")) this.props.disabledHelp();
      if (inputStates.get("enabled")) this.props.disabledInput();
    }
  }

  sendButtonresponse(event) {
    const $item = event.target,
      msg = $item.dataset.msg.toString();
    //Bloquea botones
    $item.parentElement.className += " bloqued";
    //Envia mensaje
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
  colorHeader: PropTypes.string.isRequired,
  ayudaStates: PropTypes.any.isRequired,
  inputStates: PropTypes.any.isRequired,
  customParamsStates: PropTypes.any.isRequired
};
