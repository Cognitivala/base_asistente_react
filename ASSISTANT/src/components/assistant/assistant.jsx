import React, { Component } from "react";
import Header from "../header/header";
import Input from "../input/input";
import Help from "../help/help";
import Conversations from "../conversation/conversations";
import IsFetching from "../modules/is-fetching";

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

  //ORIGEN
  getOrigen() {
    const token = false;
    if (token) {
      if (!this.isMobileDevice) {
        this.props.setOrigen("Mobile Privado");
      } else {
        this.props.setOrigen("Sitio Privado");
      }
    } else {
      if (!this.isMobileDevice) {
        this.props.setOrigen("Mobile Público");
      } else {
        this.props.setOrigen("Sitio Público");
      }
    }
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
      hc = JSON.parse(localStorage.getItem("hc")),
      hcm = JSON.parse(localStorage.getItem("hcm")),
      hcc = JSON.parse(localStorage.getItem("hcc"));

    //Si está abierto o cerrado
    if (keep_conversation) {
      if (hc) setHistory(hc);
      if (hcm) toggleMinimizedAssistant(hcm);
      if (hcc) openAssistant();
      if (hc && hcc) closeLauncher(); //Deshabilitar launcher
    } else {
      localStorage.removeItem("hcm");
      localStorage.removeItem("hcc");
      localStorage.removeItem("hc");
    }
  }

  closeAssistant() {
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
    const {
        closeAssistant,
        conversationsStates,
        sendSaludo
      } = this.props,
      saludo = conversationsStates
        .get("conversations")
        .get(0)
        .toJS();

    closeAssistant();
    saludo.enabled = true;
    sendSaludo(saludo);

    localStorage.removeItem("hcm");
    localStorage.removeItem("hcc");
    localStorage.removeItem("hc");
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

  content(assistantStates) {
    if (assistantStates.get("active")) {
      const { customParamsStates } = this.props,
        ayuda = customParamsStates
          .get("customParams")
          .get("settings")
          .get("help"),
        minimized = assistantStates.get("minimized");
      if (minimized) {
        return (
          <div
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
    const { assistantStates } = this.props;

    return (
      <IsFetching
        isFetching={assistantStates.get("isFetching")}
        showChildren={true}
      >
        {this.content(assistantStates)}
      </IsFetching>
    );
  }
}
