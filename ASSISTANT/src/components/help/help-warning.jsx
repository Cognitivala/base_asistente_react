import React, { Component } from "react";
import PropTypes from "prop-types";

export default class HelpWarning extends Component {
  render() {
    const { ayudaStates, mainCss } = this.props;
    let css = ayudaStates.get("showWarning") ? " " + mainCss.HelpBloqued : "";
    return (
      <div className={mainCss.Bloqueo+css}>
        <p>Debes concluir la interacción para usar la ayuda</p>
      </div>
    );
  }
}

HelpWarning.propTypes = {
  ayudaStates: PropTypes.any.isRequired,
  mainCss: PropTypes.any.isRequired,
};
