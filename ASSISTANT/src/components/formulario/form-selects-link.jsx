import React, { Component } from "react";
import PropTypes from "prop-types";
import FormSelect from "./form-select";
import FormSearch from "./form-search";
import Immutable from "immutable";
import FormSelectLink from "./form-select-link";
import FormSearchLink from "./form-search-link";

export default class FormSelectsLink extends Component {
  state = {
    selectedParent: -1,
    selectedChildren: -1
  };

  shouldComponentUpdate = (prevProps, prevStates) => {
    return (
      !Immutable.is(prevProps.selects, this.props.selects) ||
      prevProps.validateFunc !== this.props.validateFunc ||
      prevProps.withErrorParent !== this.props.withErrorParent ||
      prevProps.withErrorChildren !== this.props.withErrorChildren ||
      prevStates.selectedParent !== this.state.selectedParent ||
      prevStates.selectedChildren !== this.state.selectedChildren
    );
  };

  setSelectedParent = selected => {
    this.setState({ selectedParent: selected, selectedChildren: -1, childrenChange:true});
  };

  setSelectedChildren = selected => {
    this.setState({ selectedChildren: selected});
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
            <FormSelectLink
              name={parent.get("name")}
              validateFunc={validateFunc}
              validate={parent.get("validate")}
              withError={withErrorParent}
              options={parent.get("options")}
              setSelectedParent={this.setSelectedParent}
              selectedParent={this.state.selectedParent}
              typeLink={"parent"}
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
            <FormSearchLink
              name={parent.get("name")}
              validateFunc={validateFunc}
              validate={parent.get("validate")}
              withError={withErrorParent}
              options={parent.get("options")}
              setSelectedParent={this.setSelectedParent}
              selectedParent={this.state.selectedParent}
              typeLink={"parent"}
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
    if(selectedParent!==-1){
      const optionsChildren = children.get("options");
      const options = optionsChildren.filter(opt => opt.get("key") === selectedParent)
      switch (type) {
        case "select":
          return (
            <fieldset className="selects-link">
              <legend>{children.get("legend")}</legend>
              <FormSelectLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={options.get(0).get("options")}
                selectedParent={this.state.selectedParent}
                selectedChildren={this.state.selectedChildren}
                setSelectedChildren={this.setSelectedChildren}
                typeLink={"children"}
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
              <FormSearchLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                options={options.get(0).get("options")}
                selectedParent={this.state.selectedParent}
                selectedChildren={this.state.selectedChildren}
                setSelectedChildren={this.setSelectedChildren}
                typeLink={"children"}
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
              <FormSelectLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                disabled={true}
                selectedChildren={this.state.selectedChildren}
                typeLink={"children"}
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
              <FormSearchLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                disabled={true}
                selectedChildren={this.state.selectedChildren}
                typeLink={"children"}
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
