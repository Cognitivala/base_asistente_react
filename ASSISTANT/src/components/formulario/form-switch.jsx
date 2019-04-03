import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSwitch extends Component {

  content() {
    const { name, validateFunc, validate, withError, mainCss } = this.props;
    let cssClass = withError ? " "+mainCss.Error : "";
    return (
      <label className={mainCss.Switch}>
        <strong>NO</strong>
        <input
          type="checkbox"
          className={cssClass}
          name={name}
          onChange={validateFunc.bind(this, validate, name)}
        />
        <span className={mainCss.Slider+" "+mainCss.Round} />
        <strong>SI</strong>
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
  withError: PropTypes.bool,
  mainCss: PropTypes.object.isRequired,
};
