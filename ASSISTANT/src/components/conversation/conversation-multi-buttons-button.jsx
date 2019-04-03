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
    const { button, mainCss } = this.props,
      cssClass = this.state.active?"":" "+mainCss.Hover
    return (
      <button
        className={mainCss.Btn + " " + mainCss.BtnBig +cssClass}
        data-msg={button.get("value")}
        onClick={this.toggleButton}
      >
        {button.get("title")}
      </button>
    );
  }
}

ConversationMultiButtonsButton.propTypes = {
    button: PropTypes.any.isRequired,
    toggleSelectButton: PropTypes.func.isRequired,
    mainCss: PropTypes.any.isRequired
};
