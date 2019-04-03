import React, { Component } from "react";
import PropTypes from "prop-types";
import Timer from "../modules/timer";

//------------------------SPEECH RECOGNITION-----------------------------
// Se verifica si no es Chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let transcriptFinal = "",
  recognition = undefined;
if(isChrome){
  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  if ("SpeechRecognition" in window) {
    console.log("Supported");
  } else {
    console.log("Not Supported");
  }
  recognition = new window.SpeechRecognition();
  recognition.continous = false;
  recognition.interimResults = true;
  recognition.lang = "es-CL";
}

export default class InputVoice extends Component {
  constructor(props) {
    super(props);
    this.button = React.createRef();
    this.state = {
      listening: false
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  disabled(){
    const {mainCss} = this.props,
      buttonHelp = document.getElementsByClassName(mainCss.ButtonHelp)[0],
      iconEmoji = document.getElementsByClassName(mainCss.IconEmoji)[0];
    if(buttonHelp !== undefined) buttonHelp.classList.add(mainCss.Disabled);
    if(iconEmoji !== undefined) iconEmoji.parentElement.classList.add(mainCss.Disabled);
  }

  enabled(){
    const {mainCss} = this.props,
      buttonHelp = document.getElementsByClassName(mainCss.ButtonHelp)[0],
      iconEmoji = document.getElementsByClassName(mainCss.IconEmoji)[0];
    if(buttonHelp !== undefined) buttonHelp.classList.remove(mainCss.Disabled);
    if(iconEmoji !== undefined) iconEmoji.parentElement.classList.remove(mainCss.Disabled);
  }

  componentWillUnmount() {
    this.setState({
      listening: false
    });
  }

  toggleListen() {
    if(!this.state.listening){
      this.disabled();
    }else{
      this.enabled();
    }
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    );
  }

  stopListening() {
    this.enabled();
    this.setState(
      {
        listening: false
      },
      this.handleListen
    );
    setTimeout(() => {
      document.getElementById("inputMessage").value = "";
      transcriptFinal = "";
    }, 200);
  }

  sendListening() {
    // debugger
    this.enabled()
    this.setState(
      {
        listening: false
      },
      this.handleListen
    );
    setTimeout(() => {
      document.getElementById("inputMessage").value = transcriptFinal;
      this.submitMessage();
    }, 200);
  }

  submitMessage() {
    // debugger;
    const inputValue = document.getElementById("inputMessage").value;
    document.getElementById("inputMessage").value = "";
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
    }
  }

  handleListen(e) {
    let finalTranscript = "";
    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {

      };
    }
    recognition.onabort = () => {
      document.getElementById("inputMessage").value = "";
    };
    recognition.onstart = () => {};
    recognition.onresult = event => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }
      transcriptFinal = finalTranscript;
    };
    recognition.onerror = event => {
      console.log("Error occurred in recognition: " + event.error);
    };
  }

  fillOnListening() {
    const { mainCss } = this.props;
    return (
      <div className={mainCss.Transcript + " " + mainCss.InputUserBtn}>
        <button
          type="button"
          className={
            mainCss.InputUserBtn +
            " " +
            mainCss.Btn +
            " " +
            mainCss.BtnTransparent
          }
          onClick={() => {
            this.stopListening();
          }}
          ref={this.button}
        >
          <i className={mainCss.IconStop} />
        </button>
        <Timer mainCss={mainCss}/>
        <button
          type="button"
          className={
            mainCss.InputUserBtn +
            " " +
            mainCss.Btn +
            " " +
            mainCss.BtnTransparent
          }
          onClick={() => {
            this.sendListening();
          }}
          ref={this.button}
        >
          <i className={mainCss.IconPlane} />
        </button>
      </div>
    );
  }

  render() {
    const { mainCss } = this.props,
      { listening } = this.state;
    // debugger
    if (listening) {
      return this.fillOnListening();
    } else {
      return (
        <button
          type="button"
          className={
            mainCss.InputUserBtn +
            " " +
            mainCss.Btn +
            " " +
            mainCss.BtnTransparent
          }
          onClick={this.toggleListen}
          ref={this.button}
        >
          <i className={mainCss.IconVoice} />
        </button>
      );
    }
  }
}

InputVoice.propTypes = {
  mainCss: PropTypes.any.isRequired
};
