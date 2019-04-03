import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

export default class FormSearchLink extends Component {
  state = {
    inputValue: ""
  };
  options = React.createRef();
  input = React.createRef();

  componentDidUpdate() {
    if (this.state.active) {
      setTimeout(() => {
        this.input.current.focus();
      }, 100);
    }
  }

  shouldComponentUpdate(nextProps, nextStates) {
    return (
      !Immutable.is(nextProps.options, this.props.options) ||
      nextProps.name !== this.props.name ||
      nextProps.validateFunc !== this.props.validateFunc ||
      nextProps.validate !== this.props.validate ||
      nextProps.withError !== this.props.withError ||
      nextProps.selectedChildren !== this.props.selectedChildren ||
      nextProps.selectedParent !== this.props.selectedParent ||
      nextProps.setSelectedChildren !== this.props.setSelectedChildren ||
      nextProps.setSelectedParent !== this.props.setSelectedParent ||
      nextProps.typeLink !== this.props.typeLink ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.active !== this.props.active ||
      nextStates.inputValue !== this.state.inputValue
    );
  }

  setSelected(e) {
    const { options,typeLink } = this.props;
    let selected = e.currentTarget.dataset.value;
    this.input.current.dataset.valor = selected;
    let selectedText = options
      .filter(fil => fil.get("value") === selected)
      .get(0)
      .get("text");
    
    this.setState(
      {
        inputValue: selectedText
      },
      () => {
        this.props.setActive(true,selected,typeLink);
      }
    );
  }

  setInputValue = () => {
    this.setState({ inputValue: this.input.current.value });
  };

  fillOptionsShow(options) {
    let retorno = [];
    const _this = this;
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
              onClick={e => {
                _this.setSelected(e);
              }}
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
    const { options, withError, disabled, name, mainCss, typeLink } = this.props;
    let cssClass = this.props.active ? ` ${mainCss.Active}` : "",
      cssClassError = withError ? ` ${mainCss.Error}` : "";
    if (this.props.active) {
      return (
        <div className={mainCss.SelectSearch}>
          <div>
            <input
              name={name}
              ref={this.input}
              disabled={disabled === undefined ? false : true}
              type="text"
              tabIndex={-1}
              className={`${mainCss.Select} ${cssClass}`}
              onChange={() => {
                this.setInputValue();
              }}
              value={this.state.inputValue}
            />
            <div
              className={mainCss.CloseSelect}
              onClick={() => {
                this.props.setActive(false,null,typeLink)
              }}
            />
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
      let valueSelected =
        this.props.typeLink === "children"
          ? this.props.selectedChildren
          : this.props.selectedParent;
      let textSelected =
        valueSelected === -1
          ? "Seleccione"
          : options
              .filter(fil => fil.get("value") === valueSelected)
              .get(0)
              .get("text");
      return (
        <div className={mainCss.SelectSearch}>
          <input
            name={name}
            data-valor={valueSelected}
            type="text"
            ref={this.input}
            className={`${mainCss.Select} ${cssClass}`}
            onFocus={() => {
              this.props.setActive(false,null,typeLink);
              this.setState({ inputValue: "" });
            }}
            disabled={disabled}
            value={textSelected}
            onChange={e => {
              e.preventDefault();
            }}
          />
        </div>
      );
    }
  }

  render() {
    return this.content();
  }
}

FormSearchLink.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.any,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool,
  selectedParent: PropTypes.any,
  selectedChange: PropTypes.bool,
  disabled: PropTypes.bool
};
