import React, { Component } from "react";
import * as Immutable from "immutable";
import IsFetching from "../modules/is-fetching";
import ConversationMsg from "./conversation-msg";
import ConversationButtons from "./conversation-buttons";
import ConversationSelects from "./conversation-selects";

import Valoracion from "../valoracion/valoracion";
import Formulario from "../formulario/formulario";
import FormValoracion from "../formValoracion/FormValoracion";

import ConversationMultiButtons from "./conversation-multi-buttons";
import ConversationCalendar from "./conversation-calendar";
import ConversationFiles from "./conversation-files";
import ConversationAttach from "./conversation-attach";
import ConversationLikes from "./conversation-likes";
import AES from "crypto-js/aes";
import { KEY_ENCRYPT } from "../../actions/key-encrypt";
import FormularioValoracion from "../formValoracion/FormularioValoracion";
import FormAsistencia from "../formAsistencia/FormAsistencia";

export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.test = React.createRef();
    this.state = { asistencia: false }
    this.handleScroll = this.handleScroll.bind(this);
    this.verAsistencia = this.verAsistencia.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (!Immutable.is(nextProps.conversationsStates, this.props.conversationsStates)){
      this.scrollToBottom();
      this.setHistory();
      this.toggleEnabled();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.conversationsStates, this.props.conversationsStates)){
      this.handleScroll();
    }
  }

  componentDidMount() {
    this.handleScroll();
    this.scrollToBottom();
  }


  componentWillMount(){
    
    const { conversationsStates, disabledInput } = this.props,
      conversations = conversationsStates.get('conversations'),
      conversation = conversations.get(-1),
      buttons = conversation.get("buttons"),
      selects = conversation.get("selects"),
      multibuttons = conversation.get("multibuttons"),
      datepicker = conversation.get("datepicker"),
      files = conversation.get("files"),
      attach = conversation.get("attach"),
      like = conversation.get("like"),
      withStars = conversation.get("withStars");
      if(buttons || selects || multibuttons || datepicker || files || attach || like || withStars){
        disabledInput();
      }
  }

  verAsistencia(value) {
    console.log('Asistencia:: ', value);
    this.setState({asistencia: value});
  }

  handleScroll(event) {
    const { conversationsStates, toggleHeaderMore, moreHeader } = this.props,
      sizeConv = conversationsStates.get("conversations").size;
    if (sizeConv > 1) {
      toggleHeaderMore(false);
    } else if(sizeConv===1) {
      toggleHeaderMore(true)
    } else if(moreHeader) {
      toggleHeaderMore(true);
    }
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
        attach = lastConversation.get("attach"),
        liftUp = lastConversation.get("liftUp"),
        like = lastConversation.get("like"),
        rating = lastConversation.get("rating"),
        end_conversation = lastConversation.get("end_conversation");
      if (
        buttons !== undefined ||
        selects !== undefined ||
        liftUp !== undefined ||
        multibuttons !== undefined ||
        datepicker !== undefined ||
        attach !== undefined ||
        (like !== undefined && like) ||
         (rating !== undefined && rating) ||
         (end_conversation !== undefined && end_conversation)
      ) {
        if (help && ayudaStates.get("open")) this.props.closeHelp();
        if ((help && ayudaStates.get("enabled"))) this.props.disabledHelp();
        if (inputStates.get("enabled")) this.props.disabledInput();
      } else {
        if ((help && !ayudaStates.get("enabled"))) this.props.enabledHelp();
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
      conversations.forEach((conversation,i) => {
        const buttons = conversation.get("buttons"),
        multibuttons = conversation.get("multibuttons"),
        selects = conversation.get("selects"),
        msg = conversation.get("msg"),
        send = conversation.get("send"),
        liftUp = conversation.get("liftUp"),
        enabled = conversation.get("enabled"),
        form = conversation.get("form"),
        datepicker = conversation.get("datepicker"),
        files = conversation.get("files"),
        attach = conversation.get("attach"),
        like = conversation.get("like"),
        withStars = conversation.get("withStars"),
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
          datepicker: datepicker !== undefined ? datepicker : datepicker,
          files: files !== undefined ? files : files,
          attach: attach !== undefined ? attach.toJS() : attach,
          like: like !== undefined ? like : like,
          withStars: withStars !== undefined ? withStars : withStars
        };
      if (largo === i) map.general = conversation.get("general").toJS();
      hc.push(map);
      });
      let str_md5v = AES.encrypt(JSON.stringify(hc), KEY_ENCRYPT).toString();
      localStorage.setItem("hc", str_md5v);
    }
  }

  scrollToBottom() {
    if (!this.props.ayudaStates.get("open")) {
      this.scrollTo(this.test.current, this.test.current.scrollHeight, 600);
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
    const {
        updateConversation,
        updateConversationButton,
        conversationsStates,
        customParamsStates,
        generalStates,
        mainCss
      } = this.props,
      sizeConversation = conversationsStates.get("conversations").size,
      avatar = customParamsStates.getIn(["customParams", "avatar"]),
      colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]),
      userImg = customParamsStates.getIn(["customParams", "userImg"]);

    return conversationsStates.get("conversations").map((map, j) => {
      const conversation = map,
        enabled = conversation.get("enabled");
      let retorno = [];
      if (enabled !== undefined && enabled) {
        const buttons = conversation.get("buttons"),
          selects = conversation.get("selects"),
          msg = conversation.get("msg"),
          send = conversation.get("send"),
          multibuttons = conversation.get("multibuttons"),
          datepicker = conversation.get("datepicker"),
          liftUp = conversation.get("liftUp"),
          files = conversation.get("files"),
          attach = conversation.get("attach"),
          like = conversation.get("like"),
          rating = conversation.get("rating"),
          last = j + 1 === sizeConversation ? true : false,
          withStars = conversation.get("withStars"),
          animation = last ? "animated-av fadeInUp-av " : mainCss.Bloqued+" "; //Si es la última conversa
        if (msg !== undefined) {
          const { sendLike } = this.props;
          
          retorno.push(
            <ConversationMsg
              key={j}
              avatar={avatar}
              msgs={msg}
              animation={animation}
              send={send}
              userImg={userImg}
              like={like}
              last={last}
              sendLike={sendLike}
              mainCss={mainCss}
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
              updateConversationButton={updateConversationButton}
              generalStates={generalStates}
              mainCss={mainCss}
            />
          );
        }

        if (selects !== undefined) {
          retorno.push(
            <ConversationSelects
              key={j * 20}
              options={selects}
              animation={animation}
              send={send}
              generalStates={generalStates}
              updateConversation={updateConversation}
              mainCss={mainCss}
            />
          );
        }

        if (multibuttons !== undefined) {
          retorno.push(
            <ConversationMultiButtons
              key={j * 30}
              buttons={multibuttons}
              animation={animation}
              send={send}
              updateConversationButton={updateConversationButton}
              generalStates={generalStates}
              mainCss={mainCss}
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
              mainCss={mainCss}
            />
          );
        }

        if (attach !== undefined) {
          const { attachFile } = this.props;
          retorno.push(
            <ConversationAttach
              attach={attach}
              attachFile={attachFile}
              key={j * 40}
              animation={animation}
              send={send}
              colorHeader={colorHeader}
              generalStates={generalStates}
              mainCss={mainCss}
            />
          );
        }

        if (files !== undefined) {
          retorno.push(
            <ConversationFiles
              key={j * 24}
              files={files}
              animation={animation}
              send={send}
              generalStates={generalStates}
              mainCss={mainCss}
            />
          );
        }

        //Sólo si es la última conversación y tiene para levantar modal
        if (last) {
          if (liftUp !== undefined) {
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
                    setServicioValoracion,
                    updateConversationButton,
                    generalStates,
                    disabledHelp,
                    disabledInput
                  } = this.props;
                  // debugger
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
                      setServicioValoracion={setServicioValoracion}
                      setPudoResolverValoracion={setPudoResolverValoracion}
                      updateConversationButton={updateConversationButton}
                      mainCss={mainCss}
                      withStars={withStars}
                      disabledHelp={disabledHelp}
                      disabledInput={disabledInput}
                      conversationsStates={conversationsStates}
                    />
                  );
                }
                break;
              case "form":
                const {
                    formularioStates,
                    closeForm,
                    generalStates,
                    attachFileForm,
                    sendForm,
                    deleteFileForm,
                    customParamsStates
                  } = this.props,
                  enabledFormulario = formularioStates.get("enabled"),
                  form = conversation.get("form");

                if (enabledFormulario) {
                  retorno.push(
                    <Formulario
                      key={j}
                      formularioStates={formularioStates}
                      form={form}
                      generalStates={generalStates}
                      closeForm={closeForm}
                      colorHeader={colorHeader}
                      sendForm={sendForm}
                      attachFileForm={attachFileForm}
                      deleteFileForm={deleteFileForm}
                      customParamsStates={customParamsStates}
                      mainCss={mainCss}
                      animation={animation}
                    />
                  );
                }
                break;
              default:
                break;
            }
          } 
          
          if (like !== undefined && like) {

            const { sendLike, conversationsStates, generalStates } = this.props;
            retorno.push(
              <ConversationLikes
                key={j * 33}
                conversationsStates={conversationsStates}
                sendLike={sendLike}
                colorHeader={colorHeader}
                generalStates={generalStates}
                mainCss={mainCss}
              />
            );
          } 
          else if ( this.state.asistencia === true) {
            const { sendValoracion, generalStates } = this.props;
            retorno.push(
              <FormAsistencia key={`${j} * ${j} * 535`} generalStates={generalStates} sendValoracion={sendValoracion} />
            )
          }
          else if ( rating ) {
            const { sendValoracion, generalStates } = this.props;
            // <FormValoracion  key={`${j}+1`} mainCss={mainCss} generalStates={generalStates} sendValoracion={sendValoracion} />
            retorno.push(
              <FormularioValoracion key={`${j} * 55`} generalStates={generalStates} sendValoracion={sendValoracion} />
            );
          }
          
        }
      }
      return retorno;
    });
  }

  

  render() {
    const { ayudaStates, inputStates, conversationsStates, customParamsStates, mainCss } = this.props;
    const colorHeader = customParamsStates.getIn(["customParams", "colorHeader"]);
    let css = ayudaStates.get("open") ? " active" : "", cssHolder = inputStates.get("enabled") ? "" : " holder";
    return (
      <IsFetching
        isFetching={conversationsStates.get("isFetching")}
        showChildren={true} colorHeader={colorHeader} mainCss={mainCss}
      >
        <section
          // onScroll={this.handleScroll}
          className={ mainCss.ConversationHolder + " " + css + cssHolder }
          data-conversation="" ref={this.test}
        >
          {this.fillConversation()}
          {/* <div className='asistencia'>
            <i className="fas fa-paperclip" onClick={ () => this.verAsistencia(!this.state.asistencia)} />
          </div> */}
        </section>
      </IsFetching>
    );
  }
}
