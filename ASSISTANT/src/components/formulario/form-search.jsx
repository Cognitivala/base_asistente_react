import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.options = React.createRef();
    this.input = React.createRef();
    this.inputActive = React.createRef();
    this.setSelected = this.setSelected.bind(this);
  }

  shouldComponentUpdate(prevProps, prevStates) {
    return (
      prevProps.name !== this.props.name ||
      prevProps.options !== this.props.options ||
      prevProps.validateFunc !== this.props.validateFunc ||
      prevProps.validate !== this.props.validate ||
      prevProps.withError !== this.props.withError ||
      prevProps.disabled !== this.props.disabled ||
      prevProps.selectedChange !== this.props.selectedChange ||
      prevProps.selectedParent !== this.props.selectedParent ||
      prevStates.selected !== this.state.selected ||
      prevStates.active !== this.state.active ||
      prevStates.select !== this.state.select ||
      prevStates.inputValue !== this.state.inputValue
    );
  }

  setSelected(validate, name, validateFunc, e) {
    let selected = e.currentTarget.textContent;
    this.input.current.value = selected;
    this.setState({
      active: false
    },()=>{
      //PASARLE EL SELECTED 
      this.props.setSelectedChange();
    });
  }

  fillOptionsShow(options) {
    const { validateFunc, validate, name } = this.props;
    let retorno = [];
    retorno.push(
      options
        .filter(filter =>
          filter
            .get("text")
            .toString()
            .toLowerCase()
            .includes(this.state.inputValue.toLowerCase())
        )
        .map((map, i) => {
          return (
            <div
              key={i}
              data-value={map.get("value")}
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
          // }
        })
    );
    return retorno;
  }

  content() {
    const { options, withError, disabled } = this.props;
    let cssClass = this.state.active ? " active" : "",
      cssClassError = withError ? " error" : "";
    if (this.state.active) {
      return (
        <div className="select-search" >
          <div>
            <input
              ref={this.input}
              disabled={disabled===undefined?false:true}
              type="text"
              tabIndex={-1}
              className={"select " + cssClass}
              onChange={() => {
                this.setState({ inputValue: this.input.current.value });
              }}
              onFocus={() => {
                this.setState({ active: true });
              }}
              value={this.state.inputValue}
            />
            <div className="close-select" onClick={()=>{
              this.setState({ active: false });
            }}></div>
          </div>
          <div
            className={"options" + cssClass + cssClassError}
            ref={this.options}
          >
            {this.fillOptionsShow(options)}
          </div>
        </div>
      );
    } else {
      debugger
      return (
        <div className="select-search">
          <input
            type="text"
            className={"select " + cssClass}
            onFocus={() => {
              this.setState({ active: true });
            }}
            disabled={disabled}
            value={this.props.selectedChange?"":this.state.selected}
            onChange={(e)=>{e.preventDefault()}}
          />
        </div>
      );
    }
  }

  render() {
    return this.content();
  }
}

FormSearch.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.any.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool,
  selectedParent: PropTypes.any,
  selectedChange: PropTypes.bool,
  disabled: PropTypes.bool
};
