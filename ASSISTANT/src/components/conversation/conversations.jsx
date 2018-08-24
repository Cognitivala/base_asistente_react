import React, { Component } from "react";
import ConversationMsg from "./conversation-msg";
import ConversationButtons from "./conversation-buttons";
import ConversationSelects from "./conversation-selects";

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.toggleEnabledHelp = this.toggleEnabledHelp.bind(this);
    this.test = React.createRef();
  }

  componentWillMount() {
    this.scrollToBottom();
    this.toggleEnabledHelp();
  }

  componentWillReceiveProps() {
    this.scrollToBottom();
    this.toggleEnabledHelp();
  }

  //Scroll Bottom
  scrollToBottom() {
    setTimeout(() => {
      if (!this.props.ayudaStates.get("open")) {
        this.scrollTo(this.test.current, this.test.current.scrollHeight, 300);
      }
    }, 150);
  }

  scrollTo(element, to, duration) {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20,
      _this = this;

    var animateScroll = function() {
      currentTime += increment;
      var val = _this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  //Fin Scroll Bottom

  toggleEnabledHelp() {
    setTimeout(() => {
      
      const algo = this.props.conversationsStates.get("conversations"),
        ayudaStates = this.props.ayudaStates;
      if (algo.size > 0) {
        const conversation = algo.get(-1),
          buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          modal = conversation.get("modal"),
          largo =
            document.getElementsByClassName("conversation-bubble").length - 1,
          lastButton = document.getElementsByClassName("conversation-bubble")[
            largo
          ],
          bloqued = lastButton.classList.contains("bloqued");
        if (
          (buttons !== undefined && !bloqued) ||
          (selects !== undefined && !bloqued) ||
          modal !== undefined
        ) {
          if (ayudaStates.get("open")) this.props.closeHelp();
          if (ayudaStates.get("enabled")) this.props.disabledHelp();
        } else {
          if (!ayudaStates.get("enabled")) this.props.enabledHelp();
        }
      }
    }, 50);
  }

  fillConversation(
    avatar,
    conversationsStates,
    updateConversationButton,
    colorHeader,
    generalStates
  ) {
    return conversationsStates.get("conversations").map((map, i) => {
      const conversation = map,
        enabled = conversation.get("enabled"); // Si se pinta o nó
      let retorno = [];
      if (enabled) {
        const buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send"),
          sizeMap = conversationsStates.get("conversations").size;
        let animation =
          i + 1 === sizeMap ? "animated-av fadeInUp-av " : "bloqued "; //Si es la última conversa

        if (msg !== undefined) {
          //Si tiene mensaje
          retorno.push(
            <ConversationMsg
              key={i}
              avatar={avatar}
              msgs={msg}
              animation={animation}
              send={send}
              colorHeader={colorHeader}
            />
          );
        }

        if (buttons !== undefined) {
          //Si tiene botones
          retorno.push(
            <ConversationButtons
              key={i * 10}
              buttons={buttons}
              animation={animation}
              send={send}
              updateConversationButton={updateConversationButton}
              colorHeader={colorHeader}
              generalStates={generalStates}
            />
          );
        }

        if (selects !== undefined) {
          //si tiene selects
          retorno.push(
            <ConversationSelects
              key={i * 20}
              selects={selects}
              animation={animation}
              send={send}
            />
          );
        }
      }
      return retorno;
    });
  }

  render() {
    const { conversationsStates, customParamsStates, ayudaStates } = this.props,
      avatar = customParamsStates.getIn(["customParams", "avatar"]),
      colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]);
    let css = ayudaStates.get("open") ? " active" : "";
    return (
      <section
        className={"conversation-holder box-wrapp" + css}
        data-conversation=""
        ref={this.test}
      >
        {this.fillConversation(
          avatar,
          conversationsStates,
          this.props.updateConversationButton,
          colorHeader,
          this.props.generalStates
        )}
      </section>
    );
  }
}
