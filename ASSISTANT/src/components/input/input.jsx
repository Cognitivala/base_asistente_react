import React, { Component } from "react";
import * as Immutable from "immutable";
import ConversationLoader from "../conversation/conversation-loader";
import IsFetching from "../modules/is-fetching";
import InputAttach from "./input-attach";
import InputEmoji from "./input-emoji";
import InputHelp from "./input-help";
import InputVoice from "./input-voice";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 0
    };
    this.input = React.createRef();
    this.submitMessage = this.submitMessage.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputStates.get('enabled')){
      this.focus();
    }
  }

  focus() {
    setTimeout(() => {
      // const hrefLocal = window.location.origin;
      // if (hrefLocal !== "http://localhost:3000") {
      //   const href = window.top.location.href,
      //     hrefLast = href.substring(href.length - 13, href.length),
      //     input = this.input.current;
      //   if (hrefLast !== "personalizar/" && hrefLast !== "/personalizar")
      //     if (input !== null) input.focus();
      // } else {
        if (this.input.current !== null) this.input.current.focus();
      // }
    }, 300);
  }

  sendMsg(event){
    if(event.keyCode === 13) this.submitMessage(event);
  }

  updateMsg(event) {
    const start = event.target.selectionStart,
      end = event.target.selectionEnd;
    this.setState({
      start,
      end
    });
  }

  updatePosition(event) {
    const start = event.target.selectionStart,
      end = event.target.selectionEnd;
    this.setState({
      start,
      end
    });
  }

  submitMessage(event) {
    event.preventDefault();
    const inputValue = this.input.current.value.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (inputValue.length > 0) {
      const { generalStates } = this.props,
        general = generalStates.toJS(),
        msg = inputValue,
        conversation = {
          general,
          msg: [msg],
          send: "to",
          enabled: true
        };
      this.props.updateConversation(conversation);
      this.input.current.value = "";
    }
  }

  fillAttach() {
    // Se comenta por que no se usará en el input
    const { customParamsStates, attachFile, generalStates } = this.props,
      attach = customParamsStates.getIn(["customParams", "settings", "attach"]);
    if (attach) {
      return (
        <InputAttach attachFile={attachFile} generalStates={generalStates} />
      );
    } else {
      return null;
    }
  }

  fillEmoji() {
    const { customParamsStates, mainCss, responsiveStates, disabledHelp, enabledHelp, moreHeader, toggleHeaderMore } = this.props,
      emoji = customParamsStates.getIn(["customParams", "settings", "emoji"]);
    if (emoji) {
      return (
        <InputEmoji
          start={this.state.start}
          end={this.state.end}
          mainCss={mainCss}
          responsiveStates={responsiveStates}
          disabledHelp={disabledHelp}
          enabledHelp={enabledHelp}
          moreHeader={moreHeader}
          toggleHeaderMore={toggleHeaderMore} 
        />
      );
    } else {
      return null;
    }
  }

  fillSend() {
    const { customParamsStates, mainCss } = this.props,
      voice = customParamsStates.getIn(["customParams", "settings", "voice"]);
    if (voice) {
      // Si tiene voice
      if (this.input.current !== null && this.input.current.value.length > 0) {
        // Si tiene texto
        return (
          <button
            className={
              mainCss.InputUserBtn +
              " " +
              mainCss.Btn +
              " " +
              mainCss.BtnTransparent
            }
            onClick={this.submitMessage}
            id="buttonInputMessage"
          >
            <i className={mainCss.IconPlane} />
          </button>
        );
      } else {
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if(isChrome) return <InputVoice {...this.props} />;
        return null;
      }
    } else {
      return (
        <button
          className={
            mainCss.InputUserBtn +
            " " +
            mainCss.Btn +
            " " +
            mainCss.BtnTransparent
          }
          onClick={this.submitMessage}
          id="buttonInputMessage"
        >
          <i className={mainCss.IconPlane} />
        </button>
      );
    }
  }

  fillHelp(positionHelp) {
    const {
      mainCss,
      ayudaStates,
      openHelp,
      closeHelp,
      showWarningHelp,
      hideWarningHelp
    } = this.props;
    if (positionHelp === "bottom") {
      return (
        <InputHelp
          ayudaStates={ayudaStates}
          openHelp={openHelp}
          closeHelp={closeHelp}
          showWarningHelp={showWarningHelp}
          hideWarningHelp={hideWarningHelp}
          mainCss={mainCss}
        />
      );
    }
  }

  render() {
    const { mainCss } = this.props;
    if (this.props.conversationsStates.get("loading")) {
      return <ConversationLoader active={true} mainCss={mainCss} />;
    } else if (!this.props.inputStates.get("enabled")) {
      return (
        <form
          className={mainCss.InputUserHolder + " " + mainCss.Inactive}
          noValidate=""
        />
      );
    } else {
      const { customParamsStates, mainCss } = this.props,
        colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]),
        positionHelp = customParamsStates.getIn([
          "customParams",
          "settings",
          "positionHelp"
        ]);
      return (
        <IsFetching
          isFetching={this.props.inputStates.get("isFetching")}
          showChildren={true}
          colorHeader={colorHeader}
          mainCss={mainCss}
        >
          <div className={mainCss.InputUserHolder} noValidate="">
            {this.fillEmoji()}
            <input
              className={mainCss.InputUser}
              placeholder="Escribe tu consulta"
              name="message"
              onChange={this.updateMsg}
              onClickCapture={this.updatePosition}
              onKeyUp={this.sendMsg}
              ref={this.input}
              tabIndex="0"
              autoComplete="off"
              id="inputMessage"
            />
            {this.fillAttach()}
            {this.fillHelp(positionHelp)}
            {this.fillSend()}
          </div>
        </IsFetching>
      );
    }
  }
}
