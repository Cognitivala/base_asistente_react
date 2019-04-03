import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormCheckbox extends Component {
  constructor(props) {
    super(props);
  }

  content() {
    const { name,placeholder,autocomplete,rows, validateFunc ,validate, withError } = this.props;
    let cssClass = withError?" error":"";
    return (
        <textarea
          name={name}
          placeholder={placeholder}
          autoComplete={autocomplete}
          rows={rows}
          onKeyUp={validateFunc.bind(this, validate, name)}
          className={cssClass}
        />
    );
  }

  render() {
    return this.content();
  }
}

FormCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    validateFunc: PropTypes.func.isRequired,
    validate: PropTypes.object,
    withError: PropTypes.bool,
    mainCss: PropTypes.object.isRequired,
}

