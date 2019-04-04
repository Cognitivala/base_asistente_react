import React, { Component } from "react";
import IsFetching from "../modules/is-fetching";
import Notification from "./notification";
import NotificationCircle from "./notification-circle";
import PropTypes from "prop-types";

export default class Launcher extends Component {
  constructor(props) {
    super(props);
    this.closeLauncher = this.closeLauncher.bind(this);
    this.closeAssistant = this.closeAssistant.bind(this);
    this.callAsyncData();
    this.launcher = React.createRef();
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

  closeAssistant() {
    const { closeAssistant } = this.props;
    this.notificationCDN();
    localStorage.removeItem("hcm");
    localStorage.removeItem("hc");

    closeAssistant();
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
  
  notificationCDN() {
    window.top.postMessage(
      {
        test: [
          {
            msg: "notification"
          }
        ]
      },
      "*"
    );
  }

  closeLauncher() {
    const { closeLauncher, closeHelp, openAssistant, ayudaStates } = this.props;
    closeLauncher();
    this.openAssitantCDN();
    openAssistant();
    if (ayudaStates.get("open")) closeHelp();
    if(localStorage.getItem("hcm")) localStorage.removeItem("hcm");
  }

  notification(launcherStates, mainCss) {
    if (launcherStates.get("notification") && !localStorage.getItem("hc")) {
      return (
        <Notification
          saludo={launcherStates.get("notification")}
          mainCss={mainCss}
        />
      );
    } else if (launcherStates.get("circle")) {
      return <NotificationCircle mainCss={mainCss} />;
    } else {
      return null;
    }
  }

  content(
    customParamsStates,
    launcherStates,
    conversationsStates,
    mainCss,
    responsiveStates
  ) {
    if (
      customParamsStates.get(["customParams", "status"]) !== 0 &&
      conversationsStates.get("conversations").size > 0
    ) {
      if (launcherStates.get("active")) {
        return (
          <div className={mainCss.MainLauncher}>
            <button
              ref={this.launcher}
              className={mainCss.LauncherButton}
              onClick={this.closeLauncher}
            >
              <i className={mainCss.IconLauncher}/>
            </button>
            {this.notification( launcherStates, mainCss)}
          </div>
        );
      } else if (responsiveStates.get("responsive") === "desktop") {
        return (
          <div className={mainCss.MainLauncher}>
            <button
              ref={this.launcher}
              className={mainCss.LauncherButton + " " + mainCss.Close}
              onClick={this.closeAssistant}
            >
              <i className={mainCss.IconClose} />
            </button>
          </div>
        );
      }
    }
    return null;

  }

  render() {
    const {
        customParamsStates,
        saludoStates,
        launcherStates,
        conversationsStates,
        mainCss,
        responsiveStates
      } = this.props,
      colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]);

    return (
      <IsFetching
        isFetching={customParamsStates.get("isFetching")}
        showChildren={true}
        colorHeader={colorHeader}
        mainCss={mainCss}
      >
        {this.content(
          customParamsStates,
          saludoStates,
          launcherStates,
          conversationsStates,
          mainCss,
          responsiveStates
        )}
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
