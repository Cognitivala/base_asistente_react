import React, { Component } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

export default class FormSearchLink extends Component {
  state = {
    active: false,
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

  // shouldComponentUpdate(prevProps, prevStates) {
  //   return (
  //     !Immutable.is(prevProps.options, this.props.options) ||
  //     prevProps.name !== this.props.name ||
  //     prevProps.validateFunc !== this.props.validateFunc ||
  //     prevProps.validate !== this.props.validate ||
  //     prevProps.withError !== this.props.withError ||
  //     prevProps.selectedChildren !== this.props.selectedChildren ||
  //     prevProps.selectedParent !== this.props.selectedParent ||
  //     prevProps.setSelectedChildren !== this.props.setSelectedChildren ||
  //     prevProps.setSelectedParent !== this.props.setSelectedParent ||
  //     prevProps.typeLink !== this.props.typeLink ||
  //     prevProps.disabled !== this.props.disabled ||
  //     prevStates.active !== this.state.active ||
  //     prevStates.inputValue !== this.state.inputValue
  //   );
  // }

  setSelected(e) {
    const { options } = this.props;
    let selected = e.currentTarget.dataset.value;
    this.input.current.dataset.valor = selected;
    let selectedText = options
      .filter(fil => fil.get("value") === selected)
      .get(0)
      .get("text");
    this.setState(
      {
        active: false,
        inputValue: selectedText
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
    const { options, withError, disabled, name } = this.props;
    let cssClass = this.state.active ? " active" : "",
      cssClassError = withError ? " error" : "";
    if (this.state.active) {
      return (
        <div className="select-search">
          <div>
            <input
              name={name}
              ref={this.input}
              disabled={disabled === undefined ? false : true}
              type="text"
              tabIndex={-1}
              className={"select " + cssClass}
              onChange={() => {
                this.setInputValue();
              }}
              value={this.state.inputValue}
            />
            <div
              className="close-select"
              onClick={() => {
                this.setState({ active: false });
              }}
            />
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
        <div className="select-search">
          <input
            name={name}
            data-valor={valueSelected}
            type="text"
            ref={this.input}
            className={"select " + cssClass}
            onFocus={() => {
              this.setState({ active: true, inputValue: "" });
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
  options: PropTypes.any.isRequired,
  validateFunc: PropTypes.func.isRequired,
  validate: PropTypes.object,
  withError: PropTypes.bool,
  selectedParent: PropTypes.any,
  selectedChange: PropTypes.bool,
  disabled: PropTypes.bool
};
