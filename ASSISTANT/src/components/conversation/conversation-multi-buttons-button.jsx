import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ConversationMultiButtonsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton(event) {
      this.setState({
          active: !this.state.active
      });
      const value = event.target.dataset.msg;
      this.props.toggleSelectButton(value);
  }

  render() {
    const { colorHeader, button } = this.props,
      style = { backgroundColor: colorHeader },
      cssClass = this.state.active?"":" hover"
    return (
      <button
        className={"btn btn-big"+cssClass}
        data-msg={button.get("value")}
        onClick={this.toggleButton}
        style={style}
      >
        {button.get("title")}
      </button>
    );
  }
}

ConversationMultiButtonsButton.propTypes = {
    button: PropTypes.any.isRequired,
    colorHeader: PropTypes.string.isRequired,
    toggleSelectButton: PropTypes.func.isRequired
};
