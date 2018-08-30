import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
  }

  fillOptions(options){
    return options.map((map,i)=>{
        return <option value={map.get('value')}>{map.get('text')}</option>
    });
  }

  content() {
    const { name, options , validateFunc ,validate, withError } = this.props;
    let cssClass = withError?" error":"";
    return (

        <select
          name={name}
          onChange={validateFunc.bind(this, validate, name)}
          className={cssClass}
        >
        {this.fillOptions(options)}
        </select>
    );
  }

  render() {
    return this.content();
  }
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.any.isRequired,
    validateFunc: PropTypes.func.isRequired,
    validate: PropTypes.object,
    withError: PropTypes.bool
}

