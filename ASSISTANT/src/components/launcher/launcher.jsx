import React, { Fragment, Component } from "react";
import IsFetching from "../modules/is-fetching";
import Notification from "./notification";
import NotificationCircle from "./notification-circle";
import PropTypes from "prop-types";

import "./Launcher.scss";

export default class Launcher extends Component {
  constructor(props) {
    super(props);
    this.closeLauncher = this.closeLauncher.bind(this);
    this.closeAssistant = this.closeAssistant.bind(this);
    this.callAsyncData();
    this.launcher = React.createRef();
  }

  // componentDidMount(){
  //   // console.log('componentDidMount');
  //   const { openAssistant, closeLauncher} = this.props;
  //   if(window.outerWidth <= 767){
  //     openAssistant();
  //     closeLauncher();
  //   }
  // }

  callAsyncData() {
    this.saludar();
  }

  saludar() {
    const { customParamsStates } = this.props;
    const keep_conversation = customParamsStates.getIn([
      "customParams",
      "settings",
      "keep_conversation"
    ]);
    const hc = localStorage.getItem("hc");
    
    if (!keep_conversation) {
      this.props.getSaludo();
    } else {
      if (!hc) {
        this.props.getSaludo();
      }
    }
  }
  
  componentWillMount(){
    // const urlParams = window.location;
    const pathname = window.location.pathname;
    const src = window.location.search;

    console.log('pathname: ', pathname);

    if((pathname === '/asistente/' && window.outerWidth <= 767) || (src === '?open=true' && window.outerWidth <= 767)){
      const { closeLauncher, closeHelp, openAssistant, ayudaStates } = this.props;
      closeLauncher();
      this.openAssitantCDN();
      openAssistant();
      if (ayudaStates.get("open")) closeHelp();
      if (localStorage.getItem("hcm")) localStorage.removeItem("hcm");
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
        test: [{
            msg: "assistant"
          }]
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
    if (localStorage.getItem("hcm")) localStorage.removeItem("hcm");
  }

  notification(launcherStates, mainCss, bubble_logo, bubble) {

    if (bubble){
      if (launcherStates.get("notification") && !localStorage.getItem("hc")) {
        return (
          <Notification saludo={ launcherStates.get("notification") } mainCss={mainCss} bubbleLogo={bubble_logo} />
        );
      } else if (launcherStates.get("circle")) {
        return <NotificationCircle mainCss={mainCss} bubbleLogo={bubble_logo} />;
      } else {
        return null
      }
    } else {
      return null;
    }
  }

  content( customParamsStates, launcherStates, conversationsStates, mainCss, responsiveStates) {
    
    if (
      customParamsStates.get(["customParams", "status"]) !== 0 &&
      conversationsStates.get("conversations").size > 0
    ) {
      if (launcherStates.get("active")) {
        const bubble_logo = customParamsStates.getIn([ "customParams", "bubble_logo" ]);
        const bubble = customParamsStates.getIn([ "customParams", "settings", "bubble" ]);
        // console.log('bubble_logo:: ', bubble_logo);

        return (
          <Fragment>
            <div className={mainCss.MainLauncher}>
            {this.notification(launcherStates, mainCss, bubble_logo, bubble)}
              
              { bubble_logo !== '' ? (
                <div className="boxBubbleLogo">
                  <img className="imgBubbleLogo" onClick={this.closeLauncher} src={`${bubble_logo}`} alt="Avatar Img" />
                </div>
              ) : (
                <button ref={this.launcher} className={mainCss.LauncherButton} onClick={this.closeLauncher}>
                  <i className={mainCss.IconLauncher} />
                </button>
              )}
              
            </div>
          </Fragment>
        );
      } else if (responsiveStates.get("responsive") === "desktop") {
        // console.log(responsiveStates.get("responsive"));
        return (
            <div className={mainCss.MainLauncher}>
              <button ref={this.launcher} className={mainCss.LauncherButton + " " + mainCss.Close} onClick={this.closeAssistant}>
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
