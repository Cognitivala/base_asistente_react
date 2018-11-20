import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HelpWarning extends Component {

  render() {
    const { ayudaStates } = this.props;
    let css = ayudaStates.get("showWarning") ? " help-bloqued" : "";
    return (
      <div className={"bloqueo"+css}>
        <p>Debes concluir la interacción para usar la ayuda</p>
      </div>
    );
  }
}

HelpWarning.propTypes = {
  ayudaStates: PropTypes.any.isRequired
};
