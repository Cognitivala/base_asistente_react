import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  content() {
    const { type, name, placeholder, autocomplete, validateFunc ,validate, withError } = this.props;
    let cssClass = withError?" error":"";
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onKeyUp={validateFunc.bind(this, validate, name)}
        className={cssClass}
      />
    );
  }

  render() {
    return this.content();
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autocomplete: PropTypes.string.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool
};
