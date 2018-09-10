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
      if (hc) localStorage.removeItem("hc");
      this.props.getSaludo();
    } else {
      if (!hc) this.props.getSaludo();
    }
  }

  closeLauncher() {
    const { saludoStates, generalStates, ayudaStates, customParamsStates } = this.props,
    keep_conversation = customParamsStates.getIn([
      "customParams",
      "settings",
      "keep_conversation"
    ])
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
    debugger
    if(localStorage.getItem("hc") && keep_conversation) localStorage.setItem("hcc",true);

    if (!localStorage.getItem("hc") && !saludoStates.get("send")) {
      //Si no se ha enviado el saludo
      setTimeout(() => {
        const msg = saludoStates.getIn(["saludo", "msg"]),
          send = saludoStates.getIn(["saludo", "send"]),
          general = generalStates.toJS();
        let conversation = {
          general,
          msg: [msg],
          send,
          enabled: true
        };
        this.props.sendSaludo(conversation);
      }, 500);
    }
    if (ayudaStates.get("open")) this.props.closeHelp();
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
      (saludoStates.getIn(["saludo", "msg"]).size > 0 ||
      conversationsStates.get("conversations").size > 1)
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
    const { customParamsStates, saludoStates, launcherStates, conversationsStates } = this.props;

    return (
      <IsFetching
        isFetching={customParamsStates.get("isFetching")}
        showChildren={true}
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
