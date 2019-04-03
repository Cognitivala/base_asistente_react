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
    activeParent: false,
    selectedChildren: -1,
    activeChildren: false
  };

  shouldComponentUpdate = (nextProps, nextStates) => {
    return (
      !Immutable.is(nextProps.selects, this.props.selects) ||
      nextProps.validateFunc !== this.props.validateFunc ||
      nextProps.withErrorParent !== this.props.withErrorParent ||
      nextProps.withErrorChildren !== this.props.withErrorChildren ||
      nextStates.selectedParent !== this.state.selectedParent ||
      nextStates.selectedChildren !== this.state.selectedChildren ||
      nextStates.activeChildren !== this.state.activeChildren ||
      nextStates.activeParent !== this.state.activeParent
    );
  };

  setSelectedParent = selected => {
    this.setState({ selectedParent: selected, selectedChildren: -1, childrenChange:true});
  };

  setSelectedChildren = selected => {
    this.setState({ selectedChildren: selected});
  };

  //true o false si es que debe luego cambiar el selected,
  //selected or null,
  //TypeLink
  setActive = (setSelect, selected, typeLink) => {
    if(setSelect){ // ver si tiene que seleccionar luego
      if (typeLink !== "children") {
        this.setState({activeParent:!this.state.activeParent,activeChildren:false},()=>{
          this.setSelectedParent(selected);
        })
      } else {
        this.setState({activeChildren:!this.state.activeChildren,activeParent:false},()=>{
          this.setSelectedChildren(selected);
        })
      }
    }else{ // no debe seleccionar luego
      if (typeLink !== "children") {
        this.setState({activeParent:!this.state.activeParent,activeChildren: false})
      } else {
        this.setState({activeChildren:!this.state.activeChildren,activeParent:false})
      }
    }
  }

  activeChildren = (setSelect, selected, typeLink) => {
    this.setState(
      {
        activeChildren: false
      },
      () => {
        if(setSelect){
          if (typeLink!== "children") {
            this.setSelectedParent(selected);
          } else {
            this.setSelectedChildren(selected);
          }
        }
      }
    );
  }

  fillError = (withError, error) => {
    const { mainCss } = this.props;
    return withError ? (
      <p>
        <small className={mainCss.Error}>{error}</small>
      </p>
    ) : null;
  };

  fillParent = parent => {
    const type = parent.get("type"),
      { withErrorParent, validateFunc, mainCss } = this.props;
    switch (type) {
      case "select":
        return (
          <fieldset className={mainCss.SelectsLink}>
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
              mainCss={mainCss}
              active={this.state.activeParent}
              setActive={this.setActive.bind(this)}
            />
            {this.fillError(
              withErrorParent,
              parent.getIn(["validate", "error"])
            )}
          </fieldset>
        );
      case "search":
        return (
          <fieldset className={mainCss.SelectsLink}>
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
              mainCss={mainCss}
              active={this.state.activeParent}
              setActive={this.setActive}
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
      { withErrorChildren, validateFunc, mainCss } = this.props,
      {selectedParent} = this.state;
    if(selectedParent!==-1){
      const optionsChildren = children.get("options");
      const options = optionsChildren.filter(opt => opt.get("key") === selectedParent)
      switch (type) {
        case "select":
          return (
            <fieldset className={mainCss.SelectsLink}>
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
                mainCss={mainCss}
                active={this.state.activeChildren}
                setActive={this.setActive}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        case "search":
          return (
            <fieldset className={mainCss.SelectsLink}>
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
                mainCss={mainCss}
                active={this.state.activeChildren}
                setActive={this.setActive}
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
            <fieldset className={`${mainCss.SelectsLink} ${mainCss.Disabled}`}>
              <legend>{children.get("legend")}</legend>
              <FormSelectLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                disabled={true}
                selectedChildren={this.state.selectedChildren}
                typeLink={"children"}
                mainCss={mainCss}
                active={this.state.activeChildren}
                setActive={this.setActive}
              />
              {this.fillError(
                withErrorChildren,
                children.getIn(["validate", "error"])
              )}
            </fieldset>
          );
        case "search":
          return (
            <fieldset className={`${mainCss.SelectsLink} ${mainCss.Disabled}`}>
              <legend>{children.get("legend")}</legend>
              <FormSearchLink
                name={children.get("name")}
                validateFunc={validateFunc}
                validate={children.get("validate")}
                withError={withErrorChildren}
                disabled={true}
                selectedChildren={this.state.selectedChildren}
                typeLink={"children"}
                mainCss={mainCss}
                active={this.state.activeChildren}
                setActive={this.setActive}
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
