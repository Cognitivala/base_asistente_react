import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

export default class FormSelectLink extends Component {
  constructor(props) {
    super(props);
    this.options = React.createRef();
    this.setSelected = this.setSelected.bind(this);
    console.log('PROPS FormSelectLink:: ', props);
  }


    shouldComponentUpdate = (nextProps, nextStates) => {
      return (
        nextProps.name !== this.props.name ||
        nextProps.validateFunc !== this.props.validateFunc ||
        nextProps.validate !== this.props.validate ||
        nextProps.withError !== this.props.withError ||
        nextProps.disabled !== this.props.disabled ||
        !Immutable.is(nextProps.options, this.props.options) ||
        nextProps.setSelectedParent !== this.props.setSelectedParent ||
        nextProps.setSelectedChildren !== this.props.setSelectedChildren ||
        nextProps.selectedParent !== this.props.selectedParent ||
        nextProps.selectedChildren !== this.props.selectedChildren ||
        nextProps.typeLink !== this.props.typeLink ||
        nextProps.active !== this.props.active
      );
    };

  fillOptions(options) {
    return options.map((map, i) => {
      return <option value={map.get("value")}>{map.get("text")}</option>;
    });
  }

  setSelected(validate, name, validateFunc, e) {
    console.log('setSelected name:: ', name);
    // const { mainCss } = this.props;
    let selected = e.target.dataset.valor;
    this.options.current.dataset.valor = selected;
    validateFunc(validate, name, this.options.current);
    this.props.setActive(true,selected,this.props.typeLink);
  }

  fillOptionsShow(options) {
    const { validateFunc, validate, name, typeLink, mainCss } = this.props;

    console.log('options: ', options)

    const selected =
      typeLink === "parent"
        ? this.props.selectedParent
        : this.props.selectedChildren;
    let retorno = [];
    const required = validate.get("types").filter(item => item === "required");

    
    
    //PONE EL SELECCCIONADO ARRIBA
    retorno.push(
      options
        .filter(filter => filter.get("value") === selected)
        .map((map, i) => {

          // console.log('map.get("value") 1:: ', map.get("value"))
          return (
            <div
              key={i}
              data-valor={map.get("value")}
              onClick={()=>{this.props.setActive(false,null,this.props.typeLink)}}
            >
              {map.get("text")}
            </div>
          );
        })
    );

    console.log('this.options:: ', this.options)

    options.forEach((map, i) => {

      if (required.size === 0) {

        console.log('selected 1', selected);

        // NO REQUERIDO
        if (selected === map.get("value")) {
          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              className={mainCss.Disabled}
            >
              {map.get("text")}
            </div>
          );
        } else {

          
          // si es otro
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              onClick={this.setSelected.bind(
                this,
                validate,
                name,
                validateFunc
              )}
            >
              {map.get("text")}
            </div>
          );
        }
      } else {
        console.log('selected 2', selected);
        console.log('map.get("value") 2', map.get("value"));
        
        //SI ES REQUERIDO
        if (selected === map.get("value") && map.get("value") !== -1) {
          
          console.log('REQUERIDO:: ', selected === map.get("value"));
          console.log('REQUERIDO 2:: ', map.get("value") !== -1);


          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              className={mainCss.Disabled}
            >
              {map.get("text")}
            </div>
          );
        } else if (map.get("value") === -1) {
          return null;
        } else {
          // si es otro
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              onClick={this.setSelected.bind(
                this,
                validate,
                name,
                validateFunc
              )}
            >
              {map.get("text")}
            </div>
          );
        }
      }
    });
    return retorno;
  }

  content() {
    const { options, withError, disabled, name, mainCss } = this.props;
    let cssClass = this.props.active ? ` ${mainCss.Active}` : "",
      cssClassError = withError ? ` ${mainCss.Error}` : "";
    return (
      <div className={mainCss.Select} name={name} disabled={disabled === undefined ? false : true}>
        <div
          className={mainCss.Options + cssClass + cssClassError}
          ref={this.options}
        >
          {this.fillOptionsShow(options)}
        </div>
      </div>
    );
  }

  

  render() {
    return this.content();
  }
}

FormSelectLink.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.any.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool,
  selectedParent: PropTypes.any,
  disabled: PropTypes.bool,
  selectedChildren: PropTypes.any
};
