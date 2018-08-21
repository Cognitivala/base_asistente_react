import React, { Component } from "react";
import PropTypes from "prop-types";
import BtnHelp from "../help/btn-help";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  fillHelp(ayuda) {
    if (ayuda) {
      return (
        <BtnHelp
          ayudaStates={this.props.ayudaStates}
          openHelp={this.props.openHelp}
          closeHelp={this.props.closeHelp}
          showWarningHelp={this.props.showWarningHelp}
          hideWarningHelp={this.props.hideWarningHelp}
        />
      );
    }
  }

  render() {
    const style = {
      backgroundColor: this.props.colorHeader
    };
    return (
      <div
        className="iframe-cognitive-assistant-container-header"
        style={style}
      >
        <img
          className="iframe-cognitive-assistant-container-header-image"
          src={this.props.logo}
        />
        <div className="iframe-cognitive-container-header-image-text-holder">
          <h3>{this.props.titulo}</h3>
          <p>{this.props.subtitulo}</p>
        </div>
        <button onClick={this.props.closeAssistant} className="close-button">
          <i className="fas fa-times" />
        </button>
        {this.fillHelp(this.props.ayuda)}
      </div>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  closeAssistant: PropTypes.func.isRequired,
  ayuda: PropTypes.bool.isRequired,
  colorHeader: PropTypes.string.isRequired,
  ayudaStates: PropTypes.any.isRequired,
  openHelp: PropTypes.func.isRequired,
  closeHelp: PropTypes.func.isRequired,
  showWarningHelp: PropTypes.func.isRequired,
  hideWarningHelp: PropTypes.func.isRequired
};
