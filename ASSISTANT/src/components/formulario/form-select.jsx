import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
      active: false
    };
    this.options = React.createRef();
    this.activeSelect = this.activeSelect.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  componentDidUpdate() {}

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
    let selected = e.target.dataset.value;
    this.options.current.dataset.valor = selected;
    validateFunc(validate, name, e.target.closest(".options"));
    this.setState({
      selected,
      active: false
    });
  }

  fillOptionsShow(options) {
    const { validateFunc, validate, name } = this.props;
    let retorno = [];
    const required = validate.get("types").filter(item => item === "required");
    retorno.push(options
      .filter(filter => filter.get("value") === this.state.selected)
      .map((map, i) => {
        // if (this.state.selected === map.get("value")) {
        return(
          <div
            key={i}
            data-value={map.get("value")}
            onClick={this.activeSelect}
          >
            {map.get("text")}
          </div>
        );
        // }
      }));
    options.forEach((map, i) => {
      if (required.size === 0) {
        //NO REQUERIDO
        if (this.state.selected === map.get("value")) {
          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-value={map.get("value")}
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
              data-value={map.get("value")}
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
        if (
          this.state.selected === map.get("value") &&
          map.get("value") !== -1
        ) {
          // si esta seleccionado y no es el seleccione
          retorno.push(
            <div
              data-value={map.get("value")}
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
              data-value={map.get("value")}
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
    const { options, withError } = this.props;
    let cssClass = this.state.active ? " active" : "",
      cssClassError = withError ? " error" : "";
    return (
      <div className="select">
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

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.any.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool
};
