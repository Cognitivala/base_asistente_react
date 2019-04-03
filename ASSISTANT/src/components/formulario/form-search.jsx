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

  shouldComponentUpdate(nextProps, nextStates) {
    return (
      nextProps.name !== this.props.name ||
      nextProps.options !== this.props.options ||
      nextProps.validateFunc !== this.props.validateFunc ||
      nextProps.validate !== this.props.validate ||
      nextProps.withError !== this.props.withError ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.selectedChange !== this.props.selectedChange ||
      nextProps.selectedParent !== this.props.selectedParent ||
      nextStates.selected !== this.state.selected ||
      nextStates.active !== this.state.active ||
      nextStates.select !== this.state.select ||
      nextStates.inputValue !== this.state.inputValue
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
    const { options, withError, disabled, mainCss } = this.props;
    let cssClass = this.state.active ? ` ${mainCss.Active}` : "",
      cssClassError = withError ? ` ${mainCss.Error}` : "";
    if (this.state.active) {
      return (
        <div className={mainCss.SelectSearch} >
          <div>
            <input
              ref={this.input}
              disabled={disabled===undefined?false:true}
              type="text"
              tabIndex={-1}
              className={`${mainCss.SelectSearch} ${cssClass}`}
              onChange={() => {
                this.setState({ inputValue: this.input.current.value });
              }}
              onFocus={() => {
                this.setState({ active: true });
              }}
              value={this.state.inputValue}
            />
            <div className={mainCss.CloseSelect} onClick={()=>{
              this.setState({ active: false });
            }}></div>
          </div>
          <div
            className={`${mainCss.Options} ${cssClass} ${cssClassError}`}
            ref={this.options}
          >
            {this.fillOptionsShow(options)}
          </div>
        </div>
      );
    } else {
      return (
        <div className={mainCss.SelectSearch}>
          <input
            type="text"
            className={`${mainCss.Select} ${cssClass}`}
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
