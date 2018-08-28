import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormHeader extends Component {
  constructor(props) {
    super(props);
  }

  content() {
    const { icon, textA, textB, textStrong } = this.props;
    return (
      <div class="header">
        <div class="close-form">
          <button data-msg="No" data-func="sendButtonresponse">
            <i class="fas fa-times" />
          </button>
        </div>
        <div class="icon">
          <i class={icon} />
        </div>
        <p>
          {textA}{" "}
          <strong>{textStrong}</strong>{" "}
          {textB}
        </p>
      </div>
    );
  }

  render() {
    return this.content();
  }
}

FormHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  textA: PropTypes.string.isRequired,
  textB: PropTypes.string.isRequired,
  textStrong: PropTypes.string.isRequired
}
