import React, { Component } from "react";
import IsFetching from "../modules/is-fetching";
import Notification from "./notification";
import NotificationCircle from "./notification-circle";
import PropTypes from "prop-types";

export default class Launcher extends Component {
  constructor(props) {
    super(props);
    this.closeLauncher = this.closeLauncher.bind(this);
    this.callAsyncData();
  }
  callAsyncData() {
    this.saludar();
  }

  saludar() {
    const { customParamsStates } = this.props,
      keep_conversation = customParamsStates.getIn([
        "customParams",
        "settings",
        "keep_conversation"
      ]),
      hc = localStorage.getItem("hc");
    if (!keep_conversation) {
      this.props.getSaludo();
    } else {
      if (!hc) this.props.getSaludo();
    }
  }

  openAssitantCDN() {
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
  }

  closeLauncher() {
    const { closeLauncher, closeHelp,openAssistant, ayudaStates, focus } = this.props;
    closeLauncher();
    this.openAssitantCDN();
    openAssistant();
    if (ayudaStates.get("open")) closeHelp();
    focus();
  }

  notification(saludoStates, launcherStates) {
    if (launcherStates.get("notification") && !localStorage.getItem("hc")) {
      return <Notification saludo={saludoStates.get("saludo").get("msg")} />;
    } else if (launcherStates.get("circle")) {
      return <NotificationCircle />;
    } else {
      return null;
    }
  }

  content(customParamsStates, saludoStates, launcherStates, conversationsStates) {
    if (
      launcherStates.get("active") &&
      customParamsStates.get(["customParams", "status"]) !== 0 &&
      conversationsStates.get("conversations").size > 0
    ) {
      return (
        <div id="main-cognitive-assistant-container">
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
    const { customParamsStates, saludoStates, launcherStates, conversationsStates } = this.props,
    colorHeader = customParamsStates.getIn(["customParams","colorHeader"]);

    return (
      <IsFetching
        isFetching={customParamsStates.get("isFetching")}
        showChildren={true}
        colorHeader={colorHeader}
      >
        {this.content(customParamsStates, saludoStates, launcherStates, conversationsStates)}
      </IsFetching>
    );
  }
}

Launcher.propTypes = {
  customParamsStates: PropTypes.any.isRequired,
  saludoStates: PropTypes.any.isRequired,
  launcherStates: PropTypes.any.isRequired,
  generalStates: PropTypes.any.isRequired
};
