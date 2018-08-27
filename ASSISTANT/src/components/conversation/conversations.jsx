import React, { Component } from "react";
import ConversationMsg from "./conversation-msg";
import ConversationButtons from "./conversation-buttons";
import ConversationSelects from "./conversation-selects";
import Valoracion from "../valoracion/valoracion";

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.test = React.createRef();
  }

  componentWillMount(){
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.setHistory();
    this.toggleEnabled();
  }

  toggleEnabled() {
    const { ayudaStates, inputStates, customParamsStates, conversationsStates } = this.props,
      sizeConv = conversationsStates.get('conversations').size;
    if(sizeConv>1){
      const lastConversation = conversationsStates.get('conversations').get(-1),
        buttons = lastConversation.get('buttons'),
        selects = lastConversation.get('selects'),
        help = customParamsStates.getIn(["customParams", "settings", "help"]),
        liftUp = lastConversation.get('liftUp');
      if(buttons!==undefined || selects!==undefined || liftUp!==undefined){
        if (help && ayudaStates.get("open")) this.props.closeHelp();
        if (help && ayudaStates.get("enabled")) this.props.disabledHelp();
        if (inputStates.get("enabled")) this.props.disabledInput();
      }else{
        if (help && !ayudaStates.get("enabled")) this.props.enabledHelp();
        if (!inputStates.get("enabled")) this.props.enabledInput();
      }
    }
  }

  // Guarda historial
  setHistory() {
    const { conversationsStates, customParamsStates } = this.props,
      conversations = conversationsStates.get("conversations");

    if (
      customParamsStates.getIn([
        "customParams",
        "settings",
        "keep_conversation"
      ]) &&
      conversations.size > 1
    ) {
      let hc = [];
      conversations.map(map => {
        hc.push(map.toJS());
      });
      localStorage.setItem("hc", JSON.stringify(hc));
      //console.log(localStorage.getItem("hc"));
    }
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

  fillConversation(
    avatar,
    conversationsStates,
    updateConversationButton,
    colorHeader,
    generalStates
  ) {
    return conversationsStates.get("conversations").map((map, i) => {
      const conversation = map,
        enabled = conversation.get("enabled"),
        sizeMap = conversationsStates.get("conversations").size;
      let retorno = [];
      if (enabled !== undefined && enabled) {
        const buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send"),
          liftUp = conversation.get("liftUp");
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
          const {
              ayudaStates,
              disabledHelp,
              closeHelp,
              disabledInput,
              inputStates,
              customParamsStates
            } = this.props,
            last = i + 1 === sizeMap ? true : false;
          retorno.push(
            <ConversationButtons
              key={i * 10}
              buttons={buttons}
              animation={animation}
              send={send}
              updateConversationButton={updateConversationButton}
              colorHeader={colorHeader}
              generalStates={generalStates}
              ayudaStates={ayudaStates}
              disabledHelp={disabledHelp}
              closeHelp={closeHelp}
              disabledInput={disabledInput}
              inputStates={inputStates}
              customParamsStates={customParamsStates}
              last={last}
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

        //Sólo si es la última conversación y tiene para levantar modal
        if (i + 1 === sizeMap && liftUp !== undefined) {
          switch (liftUp) {
            case "valoracion":
              const { valoracionStates } = this.props,
                enabledValoracion = valoracionStates.get("enabled");
              if (enabledValoracion) {
                const {
                  setStar,
                  setOverStar,
                  setPudoResolverValoracion,
                  sendValoracion,
                  setCommentValoracion,
                  generalStates,
                  setErrorValoracion,
                  closeValoracion,
                  ayudaStates,
                  disabledHelp,
                  closeHelp,
                  disabledInput,
                  inputStates,
                  customParamsStates
                } = this.props;
                retorno.push(
                  <Valoracion
                    key={i}
                    generalStates={generalStates}
                    setErrorValoracion={setErrorValoracion}
                    sendValoracion={sendValoracion}
                    valoracionStates={valoracionStates}
                    setStar={setStar}
                    setOverStar={setOverStar}
                    setCommentValoracion={setCommentValoracion}
                    setPudoResolverValoracion={setPudoResolverValoracion}
                    closeValoracion={closeValoracion}
                    ayudaStates={ayudaStates}
                    disabledHelp={disabledHelp}
                    closeHelp={closeHelp}
                    disabledInput={disabledInput}
                    inputStates={inputStates}
                    customParamsStates={customParamsStates}
                  />
                );
              }
              break;
            default:
              break;
          }
        }
      }
      return retorno;
    });
  }

  render() {
    const {
        conversationsStates,
        customParamsStates,
        ayudaStates,
        valoracionStates,
        updateConversationButton,
        generalStates
      } = this.props,
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
          updateConversationButton,
          colorHeader,
          generalStates,
          valoracionStates
        )}
      </section>
    );
  }
}
