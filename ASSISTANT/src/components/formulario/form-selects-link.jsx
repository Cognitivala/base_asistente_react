import React, { Component } from "react";
import PropTypes from "prop-types";
import FormSelect from "./form-select";
import FormSearch from "./form-search";
import Immutable from "immutable";

export default class FormSelectsLink extends Component {
  state = {
    selectedParent: null
  };

  shouldComponentUpdate = (prevProps, prevStates) => {
    return (
      !Immutable.is(prevProps.selects, this.props.selects) ||
      prevProps.validateFunc !== this.props.validateFunc ||
      prevProps.withErrorParent !== this.props.withErrorParent ||
      prevProps.withErrorChildren !== this.props.withErrorChildren ||
      prevStates.selectedParent !== this.state.selectedParent
    );
  };

  setSelectedParent = selected => {
    this.setState({ selectedParent: selected });
  };

  fillError = (withError, error) => {
    return withError ? (
      <p>
        <small className="error">{error}</small>
      </p>
    ) : null;
  };

  fillParent = parent => {
    const type = parent.get("type"),
      { withErrorParent, validateFunc } = this.props;
    switch (type) {
      case "select":
        return (
          <fieldset className="selects-link">
            <legend>{parent.get("legend")}</legend>
            <FormSelect
              name={parent.get("name")}
              validateFunc={validateFunc}
              validate={parent.get("validate")}
              withError={withErrorParent}
              options={parent.get("options")}
              setSelectedParent={this.setSelectedParent}
            />
            {this.fillError(
              withErrorParent,
              parent.getIn(["validate", "error"])
            )}
          </fieldset>
        );
      case "search":
        return (
          <fieldset className="selects-link">
            <legend>{parent.get("legend")}</legend>
            <FormSearch
              name={parent.get("name")}
              validateFunc={validateFunc}
              validate={parent.get("validate")}
              withError={withErrorParent}
              options={parent.get("options")}
              setSelectedParent={this.setSelectedParent}
            />
            {this.fillError(
              withErrorParent,
              parent.getIn(["validate", "error"])
            )}
          </fieldset>
        );
      default:
        break;
    }
  };

  fillChildren = children => {
    const type = children.get("type"),
      { withErrorChildren, validateFunc } = this.props,
      {selectedParent} = this.state;
    if(selectedParent!==null){
      const optionsChildren = children.get("options");
      const options = optionsChildren.filter(opt => opt.get("key") === selectedParent)
      switch (type) {
        case "select":
          return (
            <fieldset className="selects-link">
              <legend>{children.get("legend")}</legend>
              <FormSelect
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={options.get(0).get("options")}
                selectedParent={this.state.selectedParent}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        case "search":
          return (
            <fieldset className="selects-link">
              <legend>{children.get("legend")}</legend>
              <FormSearch
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={options.get(0).get("options")}
                selectedParent={this.state.selectedParent}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        default:
          break;
      }
    }else{
      switch (type) {
        case "select":
          return (
            <fieldset className="selects-link disabled">
              <legend>{children.get("legend")}</legend>
              <FormSelect
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={children.get("options").get(1).get("options")}
                selectedParent={this.state.selectedParent}
                disabled={true}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        case "search":
          return (
            <fieldset className="selects-link disabled">
              <legend>{children.get("legend")}</legend>
              <FormSearch
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={children.get("options").get(1).get("options")}
                selectedParent={this.state.selectedParent}
                disabled={true}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        default:
          break;
      }
    }
    return null;
  };

  content = () => {
    const { selects } = this.props,
      parent = selects.get("parent"),
      children = selects.get("children");
    return (
      <React.Fragment>
        {this.fillParent(parent)}
        {this.fillChildren(children)}
      </React.Fragment>
    );
  };

  render = () => {
    return this.content();
  };
}

FormSelectsLink.propTypes = {
  selects: PropTypes.any.isRequired,
  validateFunc: PropTypes.func.isRequired,
  withErrorParent: PropTypes.bool.isRequired,
  withErrorChildren: PropTypes.bool.isRequired
};
