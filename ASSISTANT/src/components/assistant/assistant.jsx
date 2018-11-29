import React, { Component } from "react";
import Header from "../header/header";
import Input from "../input/input";
import Help from "../help/help";
import Conversations from "../conversation/conversations";
import IsFetching from "../modules/is-fetching";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { KEY_ENCRYPT } from "../../actions/key-encrypt"

export default class Assistant extends Component {
  constructor(props) {
    super(props);
    this.closeAssistant = this.closeAssistant.bind(this);
    this.closeEscape = this.closeEscape.bind(this);
    this.minimizedAssistant = this.minimizedAssistant.bind(this);
  }

  componentDidMount() {
    this.setGeneralStates();
    this.getBehaviors();
  }

  setGeneralStates() {
    const { customParamsStates } = this.props,
      geolocalization = customParamsStates.getIn([
        "customParams",
        "settings",
        "geolocalization"
      ]);

    this.getOrigen();
    if (geolocalization) this.getLocation();
  }

  getBehaviors() {
    const {
        customParamsStates,
        toggleMinimizedAssistant,
        openAssistant,
        setHistory,
        closeLauncher
      } = this.props,
      keep_conversation = customParamsStates.getIn([
        "customParams",
        "settings",
        "keep_conversation"
      ]),
      hcAES = localStorage.getItem("hc");

    //Si mantiene conversacion y tiene historial guardado
    //Lo abrirá y luego si tiene minimizado lo minimizará
    if (keep_conversation && hcAES) {
      const bytes = AES.decrypt(hcAES, KEY_ENCRYPT),
        hcDecrypt = bytes.toString(CryptoJS.enc.Utf8),
        hc = JSON.parse(hcDecrypt),
        hcm = JSON.parse(localStorage.getItem("hcm"));
      setHistory(hc);
      openAssistant();
      this.openAssitantCDN();
      closeLauncher();
      if (hcm) {
        toggleMinimizedAssistant(hcm);
        this.minimizedCDN();
      }
    } else {
      localStorage.removeItem("hcm");
      localStorage.removeItem("hc");
    }
  }

  focus() {
    setTimeout(() => {
      const hrefLocal = window.location.origin;
      if(hrefLocal!=="http://localhost:3000"){
        const href = window.top.location.href,
          hrefLast = href.substring(href.length - 13, href.length),
          input = document.documentElement.getElementsByClassName('input-user')[0];
      if(hrefLast!=="personalizar/" && hrefLast !== "/personalizar")
        if(input !== null) input.focus();
      }else{
        if(document.documentElement.getElementsByClassName('input-user')[0] !== null) document.documentElement.getElementsByClassName('input-user')[0].focus();
      }
    }, 300);
  }

  //ORIGEN
  getOrigen() {
    if (!this.isMobileDevice) {
      this.props.setOrigen("mobile");
    } else {
      this.props.setOrigen("desktop");
    }

    // const token = false;
    // if (token) {
    //   if (!this.isMobileDevice) {
    //     this.props.setOrigen("Mobile Privado");
    //   } else {
    //     this.props.setOrigen("Sitio Privado");
    //   }
    // } else {
    //   if (!this.isMobileDevice) {
    //     this.props.setOrigen("Mobile Público");
    //   } else {
    //     this.props.setOrigen("Sitio Público");
    //   }
    // }
  }

  getLocation() {
    this.props.getLocation();
  }

  isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }
  //END ORIGEN

  //LOCATION

  //END LOCATION

  closeAssistant() {
    this.notificationCDN();
    const { closeAssistant } = this.props;

    localStorage.removeItem("hcm");
    localStorage.removeItem("hc");

    closeAssistant();
  }

  minimizedCDN() {
    window.top.postMessage(
      {
        test: [
          {
            msg: "minimized"
          }
        ]
      },
      "*"
    );
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

  minimizedAssistant() {
    const {
        assistantStates,
        toggleMinimizedAssistant,
        customParamsStates
      } = this.props,
      minimized = assistantStates.get("minimized"),
      keep_conversation = customParamsStates.getIn([
        "customParams",
        "settings",
        "keep_conversation"
      ]),
      hc = localStorage.getItem("hc");
    if (keep_conversation && hc) {
      localStorage.setItem("hcm", !minimized);
    }
    if (!minimized) {
      this.minimizedCDN();
    } else {
      this.openAssitantCDN();
      this.focus();

    }
    toggleMinimizedAssistant(!minimized);
  }

  closeEscape(e) {
    const tecla = e.keyCode;
    if (tecla === 27) {
      this.closeAssistant();
    }
  }

  fillHelp(ayuda) {
    if (ayuda) {
      return <Help {...this.props} />;
    }
  }

  content(assistantStates, conversationsStates) {
    if (
      assistantStates.get("active") &&
      conversationsStates.get("conversations").size > 0
    ) {
      const { customParamsStates } = this.props,
        ayuda = customParamsStates
          .get("customParams")
          .get("settings")
          .get("help"),
        minimized = assistantStates.get("minimized");
      
      if (minimized) {
        return (
          <div
            className="main-cognitive-assistant-container"
            onKeyUp={this.closeEscape}
            //tabIndex="1"
          >
            <Header
              logo={customParamsStates.get("customParams").get("logo")}
              titulo={customParamsStates.get("customParams").get("titulo")}
              subtitulo={customParamsStates
                .get("customParams")
                .get("subtitulo")}
              closeAssistant={this.closeAssistant}
              ayuda={ayuda}
              colorHeader={customParamsStates
                .get("customParams")
                .get("colorHeader")}
              ayudaStates={this.props.ayudaStates}
              openHelp={this.props.openHelp}
              closeHelp={this.props.closeHelp}
              showWarningHelp={this.props.showWarningHelp}
              hideWarningHelp={this.props.hideWarningHelp}
              minimizedAssistant={this.minimizedAssistant}
              minimized={minimized}
            />
          </div>
        );
      } else {
        return (
          <div
            className="main-cognitive-assistant-container"
            onKeyUp={this.closeEscape}
            //tabIndex="1"
          >
            <Header
              logo={customParamsStates.get("customParams").get("logo")}
              titulo={customParamsStates.get("customParams").get("titulo")}
              subtitulo={customParamsStates
                .get("customParams")
                .get("subtitulo")}
              closeAssistant={this.closeAssistant}
              ayuda={ayuda}
              colorHeader={customParamsStates
                .get("customParams")
                .get("colorHeader")}
              ayudaStates={this.props.ayudaStates}
              openHelp={this.props.openHelp}
              closeHelp={this.props.closeHelp}
              showWarningHelp={this.props.showWarningHelp}
              hideWarningHelp={this.props.hideWarningHelp}
              minimizedAssistant={this.minimizedAssistant}
              minimized={minimized}
            />
            {this.fillHelp(ayuda)}
            <Conversations {...this.props} />
            <Input {...this.props} />
          </div>
        );
      }
    } else {
      return null;
    }
  }

  render() {
    const { assistantStates, conversationsStates,customParamsStates } = this.props,
    colorHeader = customParamsStates.getIn(["customParams","colorHeader"]);
    return (
      <IsFetching
        colorHeader={colorHeader}
        isFetching={assistantStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(assistantStates, conversationsStates)}
      </IsFetching>
    );
  }
}
