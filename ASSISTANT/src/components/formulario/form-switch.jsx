import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSwitch extends Component {
  constructor(props) {
    super(props);
  }

  content() {
    const { name, validateFunc, validate, withError } = this.props;
    let cssClass = withError ? " error" : "";
    return (
      <label className="switch">
        <p>NO</p>
        <input
          type="checkbox"
          className={cssClass}
          name={name}
          onChange={validateFunc.bind(this, validate, name)}
        />
        <span className="slider round" />
        <p>SI</p>
      </label>
    );
  }

  render() {
    return this.content();
  }
}

FormSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool
};
