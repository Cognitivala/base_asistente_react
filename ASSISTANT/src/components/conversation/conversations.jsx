import React, { Component } from "react";
import PropTypes from "prop-types";
import ConversationMsg from "./conversation-msg";
import ConversationButtons from "./conversation-buttons";
import ConversationSelects from "./conversation-selects";
import Valoracion from "../valoracion/valoracion";

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.toggleEnabledHelp = this.toggleEnabledHelp.bind(this);
    this.test = React.createRef();
  }

  componentWillMount() {
    this.scrollToBottom();
    this.toggleEnabledHelp(
      this.props.conversationsStates,
      this.props.ayudaStates
    );
  }

  componentWillReceiveProps() {
    this.scrollToBottom();
    this.toggleEnabledHelp(
      this.props.conversationsStates,
      this.props.ayudaStates
    );
    this.setHistory();
  }

  componentDidUpdate() {
    this.setHistory();
  }

  setHistory() {
    const { conversationsStates, customParamsStates } = this.props,
      conversations = conversationsStates.get("conversations")

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
      +localStorage.setItem("hc", JSON.stringify(hc));
      console.log(localStorage.getItem("hc"));
    }
  }

  setStatus(status) {
    this.props.setStatus(status);
  }

  setModal() {
    debugger;
    this.props.setModal(true);
  }

  toggleEnabledHelp(conversationsStates, ayudaStates) {
    setTimeout(() => {
      const algo = conversationsStates.get("conversations");
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
    }, 300);
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
        sizeMap = conversationsStates.get("conversations").size,
        modal = conversationsStates.get("modal"),
        modalConversation = conversation.get("modal");
      let retorno = [];

      if (enabled) {
        const buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send");
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
      } else if (i + 1 === sizeMap && modalConversation) {
        switch (conversation.get("liftUp")) {
          case "valoracion":
            const {
              valoracionStates,
              setStar,
              setPudoResolverValoracion,
              sendValoracion,
              setCommentValoracion,
              generalStates,
              setErrorValoracion,
              closeValoracion
            } = this.props;

            retorno.push(
              <Valoracion
                key={i}
                generalStates={generalStates}
                setErrorValoracion={setErrorValoracion}
                sendValoracion={sendValoracion}
                valoracionStates={valoracionStates}
                setStar={setStar}
                setCommentValoracion={setCommentValoracion}
                setPudoResolverValoracion={setPudoResolverValoracion}
                closeValoracion={closeValoracion}
              />
            );
            break;
          default:
            break;
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

// Conversations.propTypes = {
//   conversationsStates: PropTypes.any.isRequired,
//   customParamsStates: PropTypes.any.isRequired,
//   ayudaStates: PropTypes.any.isRequired,
//   valoracionStates: PropTypes.any.isRequired,
//   updateConversationButton: PropTypes.func.isRequired,
//   generalStates: PropTypes.any.isRequired,
//   closeHelp: PropTypes.func.isRequired,
//   disabledHelp: PropTypes.func.isRequired,
//   enabledHelp: PropTypes.func.isRequired,
//   setStatus: PropTypes.func.isRequired,
//   setModal: PropTypes.func.isRequired,
//   setStar: PropTypes.func.isRequired
// };
