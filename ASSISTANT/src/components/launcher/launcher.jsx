import React, { Component } from "react";
import IsFetching from "../modules/is-fetching";
import Notification from "./notification";
import PropTypes from "prop-types";

export default class Launcher extends Component {
  constructor(props) {
    super(props);
    this.closeLauncher = this.closeLauncher.bind(this);
    this.callAsyncData();
  }
  callAsyncData() {
    this.props.getSaludo();
  }

  closeLauncher() {
    this.props.closeLauncher();
    window.top.postMessage(
      {
        test: [
          {
            msg: "assistant"
          }
        ]
      },
      "*"
    );
    this.props.openAssistant();
    if (!this.props.saludoStates.get("send")) {
      //Si no se ha enviado el saludo
      setTimeout(() => {
        this.props.sendSaludo(this.props.saludoStates.get("saludo").toJS());
      }, 500);
    }
    if (this.props.ayudaStates.get("open")) this.props.closeHelp();
  }

  notification(saludoStates, launcherStates) {
    if (launcherStates.get("notification"))
      return <Notification saludo={saludoStates.get("saludo").get("msg")} />;
  }

  content(customParamsStates, saludoStates, launcherStates) {
    if (
      launcherStates.get("active") &&
      customParamsStates.get("customParams").get("status") !== 0 &&
      saludoStates.get("saludo").get("msg") !== ""
    ) {
      const divStyle = {
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 99999999
      };
      return (
        <div style={divStyle} id="main-cognitive-assistant-container">
          <button
            className="launcher-button"
            onClick={this.closeLauncher}
            style={{
              backgroundColor: customParamsStates
                .get("customParams")
                .get("colorBtn")
            }}
          >
            <i className="fas fa-comments" />
          </button>
          {this.notification(saludoStates, launcherStates)}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { customParamsStates } = this.props,
      { saludoStates } = this.props,
      { launcherStates } = this.props;

    return (
      <IsFetching
        isFetching={customParamsStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(customParamsStates, saludoStates, launcherStates)}
      </IsFetching>
    );
  }
}

Launcher.propTypes = {
  customParamsStates: PropTypes.any.isRequired,
  saludoStates: PropTypes.any.isRequired,
  launcherStates: PropTypes.any.isRequired
}
