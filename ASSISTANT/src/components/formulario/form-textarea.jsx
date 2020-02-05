import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormTextarea extends Component {


  validateInput = (e) => {
    const { validateFunc ,validate, name } = this.props;
    if(validate.get("types").filter(type => type === "textarea").size > 0){
      console.log('HOLA, LLEGUÉ!');
    }
    validateFunc(validate, name,e);
  }

  content() {
    const { name,placeholder,autocomplete,rows, validateFunc ,validate, withError } = this.props;
    let cssClass = withError?" error":"";

    console.log('VALIDATE:: ', validate);
    console.log('validateFunc:: ', validateFunc);

    return (
        <textarea minlength="1" maxlength='5' name={name} placeholder={placeholder} autoComplete={autocomplete} 
        rows={rows} onKeyUp={validateFunc.bind(this, validate, name)} className={cssClass}/>
    );
  }

  render() {
    return this.content();
  }
}

FormTextarea.propTypes = {
    rows: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    autocomplete: PropTypes.string.isRequired,
    validateFunc: PropTypes.func.isRequired,
    validate: PropTypes.object,
    withError: PropTypes.bool,
    mainCss: PropTypes.object.isRequired,
}

