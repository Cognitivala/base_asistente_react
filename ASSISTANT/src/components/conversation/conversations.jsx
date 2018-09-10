import React, { Component } from "react";
import ConversationMsg from "./conversation-msg";
import ConversationButtons from "./conversation-buttons";
import ConversationSelects from "./conversation-selects";
import Valoracion from "../valoracion/valoracion";
import Formulario from "../formulario/formulario";
import ConversationMultiButtons from "./conversation-multi-buttons";
import ConversationCalendar from "./conversation-calendar";

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.test = React.createRef();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.setHistory();
    this.toggleEnabled();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  toggleEnabled() {
    const {
        ayudaStates,
        inputStates,
        customParamsStates,
        conversationsStates
      } = this.props,
      sizeConv = conversationsStates.get("conversations").size;
    if (sizeConv > 1) {
      const lastConversation = conversationsStates.get("conversations").get(-1),
        buttons = lastConversation.get("buttons"),
        selects = lastConversation.get("selects"),
        multibuttons = lastConversation.get("multibuttons"),
        help = customParamsStates.getIn(["customParams", "settings", "help"]),
        datepicker = lastConversation.get("datepicker"),
        liftUp = lastConversation.get("liftUp");
      if (
        buttons !== undefined ||
        selects !== undefined ||
        liftUp !== undefined ||
        multibuttons !== undefined ||
        datepicker !== undefined
      ) {
        if (help && ayudaStates.get("open")) this.props.closeHelp();
        if (help && ayudaStates.get("enabled")) this.props.disabledHelp();
        if (inputStates.get("enabled")) this.props.disabledInput();
      } else {
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
      let hc = [],
        largo = conversations.size - 1;
      conversations.map((conversation, i) => {
        const buttons = conversation.get("buttons"),
          multibuttons = conversation.get("multibuttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send"),
          liftUp = conversation.get("liftUp"),
          enabled = conversation.get("enabled"),
          form = conversation.get("form"),
          datepicker = conversation.get("datepicker"),
          map = {
            buttons: buttons !== undefined ? buttons.toJS() : buttons,
            selects: selects !== undefined ? selects.toJS() : selects,
            multibuttons:
              multibuttons !== undefined ? multibuttons.toJS() : multibuttons,
            msg: msg !== undefined ? msg.toJS() : msg,
            send: send !== undefined ? send : send,
            liftUp: liftUp !== undefined ? liftUp : liftUp,
            enabled: enabled !== undefined ? enabled : enabled,
            form: form !== undefined ? form : form,
            datepicker: datepicker !== undefined ? datepicker : datepicker
          };
        if (largo === i) map.general = conversation.get("general").toJS();
        hc.push(map);
      });
      localStorage.setItem("hc", JSON.stringify(hc));
    }
  }

  scrollToBottom() {
    if (!this.props.ayudaStates.get("open")) {
      this.scrollTo(this.test.current, this.test.current.scrollHeight, 300);
    }
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

  fillConversation() {
    const { updateConversation, updateConversationButton ,conversationsStates, customParamsStates, generalStates } = this.props,
      sizeConversation = conversationsStates.get("conversations").size,
      avatar = customParamsStates.getIn(["customParams", "avatar"]),
      colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]),
      userImg = customParamsStates.getIn(["customParams", "userImg"]);

    return conversationsStates.get("conversations").map((map, j) => {
      const conversation = map,
        enabled = conversation.get("enabled");
      let retorno = [];

      //SI ESTÁ ENABLED 
      if (enabled !== undefined && enabled) {
        const buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send"),
          multibuttons = conversation.get("multibuttons"),
          datepicker = conversation.get("datepicker"),
          liftUp = conversation.get("liftUp"),
          last = j + 1 === sizeConversation ? true : false,
          animation = last ? "animated-av fadeInUp-av " : "bloqued "; //Si es la última conversa

        if (msg !== undefined) {
          //Si tiene mensaje
          retorno.push(
            <ConversationMsg
              key={j}
              avatar={avatar}
              msgs={msg}
              animation={animation}
              send={send}
              userImg={userImg}
              colorHeader={colorHeader}
            />
          );
        }

        if (buttons !== undefined) {
          retorno.push(
            <ConversationButtons
              key={j * 10}
              buttons={buttons}
              animation={animation}
              send={send}
              colorHeader={colorHeader}
              updateConversationButton={updateConversationButton}
              generalStates={generalStates}
            />
          );
        }

        if (selects !== undefined) {
          //si tiene selects
          retorno.push(
            <ConversationSelects
              key={j * 20}
              options={selects}
              animation={animation}
              send={send}
              generalStates={generalStates}
              updateConversation={updateConversation}
            />
          );
        }

        if (multibuttons !== undefined) {
          debugger
          retorno.push(
            <ConversationMultiButtons
              key={j * 30}
              buttons={multibuttons}
              animation={animation}
              send={send}
              colorHeader={colorHeader}
              updateConversationButton={updateConversationButton}
              generalStates={generalStates}
            />
          );
        }

        if (datepicker !== undefined) {
          const { updateConversationCalendar } = this.props;
          retorno.push(
            <ConversationCalendar
              key={j * 40}
              animation={animation}
              send={send}
              colorHeader={colorHeader}
              updateConversation={updateConversation}
              updateConversationCalendar={updateConversationCalendar}
              datepicker={datepicker}
              generalStates={generalStates}
              last={last}
            />
          );
        }

        //Sólo si es la última conversación y tiene para levantar modal
        if (last && liftUp !== undefined) {
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
                  setErrorValoracion,
                  closeValoracion,
                  generalStates
                } = this.props;
                retorno.push(
                  <Valoracion
                    key={j}
                    generalStates={generalStates}
                    setErrorValoracion={setErrorValoracion}
                    sendValoracion={sendValoracion}
                    valoracionStates={valoracionStates}
                    setStar={setStar}
                    setOverStar={setOverStar}
                    setCommentValoracion={setCommentValoracion}
                    setPudoResolverValoracion={setPudoResolverValoracion}
                    closeValoracion={closeValoracion}
                    customParamsStates={customParamsStates}
                  />
                );
              }
              break;
            case "form":
              const { formularioStates, closeForm, generalStates } = this.props,
                enabledFormulario = formularioStates.get("enabled"),
                form = conversation.get("form");

              if (enabledFormulario) {
                retorno.push(
                  <Formulario
                    key={j}
                    formularioStates={formularioStates}
                    form={form}
                    general={generalStates}
                    closeForm={closeForm}
                    colorHeader={colorHeader}
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
    const { ayudaStates, inputStates } = this.props;
    let css = ayudaStates.get("open") ? " active" : "",
      cssHolder = inputStates.get("enabled") ? "" : " holder";
    return (
      <section
        className={"conversation-holder box-wrapp" + css + cssHolder}
        data-conversation=""
        ref={this.test}
      >
        <div>{this.fillConversation()}</div>
      </section>
    );
  }
}
