import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

export default class FormSelectLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.options = React.createRef();
    this.activeSelect = this.activeSelect.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

    shouldComponentUpdate = (prevProps, prevStates) => {
      return (
        prevProps.name !== this.props.name ||
        prevProps.validateFunc !== this.props.validateFunc ||
        prevProps.validate !== this.props.validate ||
        prevProps.withError !== this.props.withError ||
        prevProps.disabled !== this.props.disabled ||
        !Immutable.is(prevProps.options, this.props.options) ||
        prevProps.setSelectedParent !== this.props.setSelectedParent ||
        prevProps.setSelectedChildren !== this.props.setSelectedChildren ||
        prevProps.selectedParent !== this.props.selectedParent ||
        prevProps.selectedChildren !== this.props.selectedChildren ||
        prevProps.typeLink !== this.props.typeLink ||
        prevStates.active !== this.state.active
      );
    };

  fillOptions(options) {
    return options.map((map, i) => {
      return <option value={map.get("value")}>{map.get("text")}</option>;
    });
  }

  activeSelect() {
    this.setState({
      active: !this.state.active
    });
  }

  setSelected(validate, name, validateFunc, e) {
    let selected = e.target.dataset.valor;
    this.options.current.dataset.valor = selected;
    validateFunc(validate, name, this.options.current.closest(".options"));
    this.setState(
      {
        active: false
      },
      () => {
        if (this.props.typeLink !== "children") {
          this.props.setSelectedParent(selected);
        } else {
          this.props.setSelectedChildren(selected);
        }
      }
    );
  }

  fillOptionsShow(options) {
    const { validateFunc, validate, name, typeLink } = this.props;
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
          return (
            <div
              key={i}
              data-valor={map.get("value")}
              onClick={this.activeSelect}
            >
              {map.get("text")}
            </div>
          );
        })
    );
    options.forEach((map, i) => {
      if (required.size === 0) {
        //NO REQUERIDO
        if (selected === map.get("value")) {
          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              className="disabled"
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
        //SI ES REQUERIDO
        if (selected === map.get("value") && map.get("value") !== -1) {
          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-valor={map.get("value")}
              key={i + map.get("text")}
              className="disabled"
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
    const { options, withError, disabled, name } = this.props;
    let cssClass = this.state.active ? " active" : "",
      cssClassError = withError ? " error" : "";
    return (
      <div className="select" name={name} disabled={disabled === undefined ? false : true}>
        <div
          className={"options" + cssClass + cssClassError}
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
