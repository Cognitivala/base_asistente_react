import React, { Component } from "react";
import Header from "../header/header";
import Input from "../input/input";
import Help from "../help/help";
import Conversations from "../conversation/conversations";
import IsFetching from "../modules/is-fetching";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { KEY_ENCRYPT } from "../../actions/key-encrypt";
import {isMobile} from 'react-device-detect';

import { animateScroll as scroll} from "react-scroll";
import { scroller } from "react-scroll";
import { Element } from "react-scroll";

export default class Assistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreHeader: true,
      asistencia: false
    }
    this.divAssistant = React.createRef();
    this.closeAssistant = this.closeAssistant.bind(this);
    this.closeEscape = this.closeEscape.bind(this);
    this.minimizedAssistant = this.minimizedAssistant.bind(this);
    this.toggleHeaderMore = this.toggleHeaderMore.bind(this);
    this.verAsistencia = this.verAsistencia.bind(this);
  }

  componentDidMount() {
    this.setGeneralStates();
    this.getBehaviors();
  }

  toggleHeaderMore(more){
    this.setState({moreHeader:more})
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
        closeLauncher,
        getSaludoEnd,
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
        greetingAES = localStorage.getItem("gr"),
        greetingBytes = AES.decrypt(greetingAES, KEY_ENCRYPT),
        greetingDecrypt = greetingBytes.toString(CryptoJS.enc.Utf8),
        hcDecrypt = bytes.toString(CryptoJS.enc.Utf8),
        hc = JSON.parse(hcDecrypt),
        hcm = JSON.parse(localStorage.getItem("hcm")),
        greeting = JSON.parse(greetingDecrypt);
      getSaludoEnd(greeting);
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

  //ORIGEN
  getOrigen() {
    if (isMobile) {
      this.props.setOrigen(1);
    } else {
      // this.props.setOrigen("desktop");
      this.props.setOrigen(1);
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
      // this.minimizedCDN();
      this.notificationCDN();
    } else {
      this.openAssitantCDN();
      // this.focus();
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

  verAsistencia(value) {
    // console.log('State:: ', this.state);
    // const { generalStates } = this.props;
    // const general = generalStates.toJS();

    this.setState({...this.state, asistencia: value, });
    scroll.scrollToBottom();
    // scroller.scrollTo((id + 1).toString(), scrollType);
  }

  content(assistantStates, conversationsStates, responsiveStates) {
    if (
      assistantStates.get("active") &&
      conversationsStates.get("conversations").size > 0
    ) {
      const { customParamsStates, mainCss, saludoStates } = this.props,
      ayuda = customParamsStates
      .get("customParams")
      .get("settings")
      .get("help");

      const minimized = assistantStates.get("minimized"),
      cssClass = responsiveStates.get("responsive") === "mobile" ? mainCss.Mobile : "",
      cssClass2 = this.state.moreHeader?mainCss.HeaderMore:"",
      positionHelp = customParamsStates.getIn(["customParams","settings","position_help"]);

      if (minimized) {
        return (
          <React.Fragment/>
        );
      } else {
        return (
          <div
            className={mainCss.MainAssistant + " " + cssClass + " " + cssClass2 + " " + mainCss.Show}
            onKeyUp={this.closeEscape}
            ref={this.divAssistant}
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
                .get("color_header")}
              ayudaStates={this.props.ayudaStates}
              openHelp={this.props.openHelp}
              closeHelp={this.props.closeHelp}
              showWarningHelp={this.props.showWarningHelp}
              hideWarningHelp={this.props.hideWarningHelp}
              minimizedAssistant={this.minimizedAssistant}
              minimized={minimized}
              mainCss={mainCss}
              responsive={responsiveStates.get("responsive")}
              // imgBackHeader={customParamsStates
              //   .get("customParams")
              //   .get("imgBackHeader")}  
              positionHelp={positionHelp}
              toggleHeaderMore={this.toggleHeaderMore}
              moreHeader={this.state.moreHeader}
              asistencia={this.state.asistencia} 
              saludo={saludoStates.getIn(['saludo','msg'])}
            />
            {this.fillHelp(ayuda)}
            <Conversations asistencia={this.state.asistencia} getAsistencia={this.verAsistencia} {...this.props} toggleHeaderMore={this.toggleHeaderMore} moreHeader={this.state.moreHeader}/>
            <Input {...this.props} asistencia={this.state.asistencia} getAsistencia={this.verAsistencia} moreHeader={this.state.moreHeader} toggleHeaderMore={this.toggleHeaderMore} />
            <a href="https://www.cognitiva.la/" target="_blank" rel="noopener noreferrer" className={mainCss.LogoCognitiva}> </a>
          </div>
        );
      }
    } else {
      return null;
    }
  }

  render() {
    
    const { assistantStates, conversationsStates ,customParamsStates, responsiveStates, mainCss } = this.props,
    colorHeader = customParamsStates.getIn(["customParams","color_header"]);

    // console.log('customParamsStates:: ', customParamsStates);

    return (
      <IsFetching
        colorHeader={colorHeader}
        isFetching={assistantStates.get("isFetching")}
        showChildren={true}
        mainCss={mainCss}
      >
        {this.content(assistantStates, conversationsStates, responsiveStates)}
      </IsFetching>
    );
  }
}
