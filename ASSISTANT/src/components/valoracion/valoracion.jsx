import React, { Component } from "react";
import PropTypes from "prop-types";
import IsFetching from "../modules/is-fetching";
import ValoracionHeader from "./valoracion-header";
import RatingStars from "./rating-stars";
import ValoracionThanThree from "./valoracion-than-three";
import ValoracionError from "./valoracion-error";
import logo from "../../assets/images/icono-cognitiva-2.svg";
import ValoracionInquietud from "./valoracion-inquietud";
import ValoracionServicio from "./valoracion-servicio";
import ValoracionComments from "./valoracion-comments";

export default class Valoracion extends Component {
  constructor(props) {
    super(props);
    this.clickStar = this.clickStar.bind(this);
    this.overStar = this.overStar.bind(this);
    this.overStarDefault = this.overStarDefault.bind(this);
    this.setPudoResolver = this.setPudoResolver.bind(this);
    this.setComment = this.setComment.bind(this);
    this.valorar = this.valorar.bind(this);
    this.closeValoracion = this.closeValoracion.bind(this);
    this.setServicio = this.setServicio.bind(this);
  }

  componentWillMount(){
    this.props.disabledHelp();
    this.props.disabledInput();
  }

  clickStar(e) {
    e.preventDefault();
    const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
    const star = parseInt(
      _this.tagName === "SPAN"
        ? _this.innerText
        : _this.getElementsByTagName("span")[0].innerText
    );
    this.props.setStar(star);
  }

  overStar(e) {
    e.preventDefault();
    const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
    const star = parseInt(
      _this.tagName === "SPAN"
        ? _this.innerText
        : _this.getElementsByTagName("span")[0].innerText
    );
    this.props.setOverStar(star);
  }

  overStarDefault(e) {
    e.preventDefault();
    this.props.setOverStar(0);
  }

  requestValue() {
    const { valoracionStates, generalStates, conversationsStates } = this.props,
      general = generalStates.toJS(),
      comentario = valoracionStates.get("comment");
    const pudo_resolver = valoracionStates.get("pudoResolver") ? "Si" : "No",
      valoracion = valoracionStates.get("stars"),
      conversaciones = conversationsStates.get("conversations"),
      sizeConv = conversationsStates.get("conversations").size;

    const input = conversaciones
        .get(sizeConv - 4)
        .get("msg")
        .get(0);
    const output = conversaciones
        .get(sizeConv - 3)
        .get("msg")
        .get(0);
    const args = {
        valoracion,
        comentario,
        origen: general.origen,
        cid: general.cid,
        nodo_id: general.nodo_id,
        input,
        output,
        pudo_resolver,
        enabled: false
      };
    
    this.props.sendValoracion(args, general);
  }

  closeValoracion(e) {
    const { generalStates } = this.props,
      msg = "noValorar",
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false
      };
    this.props.updateConversationButton(conversation);
  }

  valorar(e) {
    const { valoracionStates } = this.props,
      comment = valoracionStates.get("comment"),
      pudoResolver = valoracionStates.get("pudoResolver");
    // let pudoResolverError = false,
    //   commentError = false;

    // if (!comment) {
    //   commentError = true;
    // }
    // if (commentError) {
    //   const data = {
    //     error: true,
    //     commentError,
    //     pudoResolverError
    //   };
    //   this.props.setErrorValoracion(data);
    // } else {
      this.requestValue();
    // }
  }

  setPudoResolver(e) {
    this.props.setPudoResolverValoracion(
      e.target.value === "si" ? true : false
    );
  }

  setServicio(e) {
    this.props.setServicioValoracion(e.target.value === "bueno" ? true : false);
  }

  setComment(e) {
    this.props.setCommentValoracion(e.target.value);
  }

  button() {
    
    const { withStars, valoracionStates, mainCss } = this.props,
      stars = valoracionStates.get("stars"),
      pudoResolver = valoracionStates.get("pudoResolver"),
      servicio = valoracionStates.get("servicio");
      // comment = valoracionStates.get("comment");
    //Si tiene estrellas
    // debugger
    if(withStars){
      if(stars!==0 && pudoResolver !== null){
        return (
          <fieldset>
            <button className={mainCss.Btn} type="button" data-msg="Sí" onClick={this.valorar}>
              Valorar
            </button>
          </fieldset>
        );
      }else{
        return (
          <fieldset>
            <button type="button" data-msg="Sí" disabled>
              Valorar
            </button>
          </fieldset>
        );
      }
    }else{
      if(servicio!==null && pudoResolver !== null){
        return (
          <fieldset>
            <button type="button" className={mainCss.Btn} data-msg="Sí" onClick={this.valorar}>
              Valorar
            </button>
          </fieldset>
        );
      }else{
        return (
          <fieldset>
            <button type="button" data-msg="Sí" disabled>
              Valorar
            </button>
          </fieldset>
        );
      }
    }
  }

  fillStars() {
    // debugger;
    const { withStars, valoracionStates, mainCss } = this.props,
    stars = valoracionStates.get("stars"),
    over = valoracionStates.get("overStar"),
    servicio = valoracionStates.get("servicio"),
    pudoResolverError = valoracionStates.get("pudoResolverError");
    if (withStars) {
      return (
        <RatingStars
          clickStar={this.clickStar}
          stars={stars}
          over={over}
          mainCss={mainCss}
          overStar={this.overStar}
          overStarDefault={this.overStarDefault}
        />
      );
    } else {
      return (
        <ValoracionServicio
          mainCss={mainCss}
          setServicio={this.setServicio}
          servicio={servicio}
          pudoResolverError={pudoResolverError}
        />
      );
    }
  }

  content() {
    const { valoracionStates, mainCss } = this.props,
      pudoResolver = valoracionStates.get("pudoResolver");
    // debugger
    return (
      <div className={mainCss.ConversationBubbleForm + " " + mainCss.Send}>
        <img className={mainCss.RoundedImg} src={logo} alt="" />

        <div
          className={mainCss.ContainerForm + " " + mainCss.ContainerValoracion}
        >
          <form autoComplete="off">
            <ValoracionHeader
              closeValoracion={this.closeValoracion}
              mainCss={mainCss}
            />
            
            <ValoracionInquietud
              mainCss={mainCss}
              setPudoResolver={this.setPudoResolver}
              pudoResolver={pudoResolver}
            />
            {this.fillStars()}
            <ValoracionComments
              mainCss={mainCss}
              setComment={this.setComment}
            />
            {this.button()}
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { valoracionStates, mainCss } = this.props;
    return (
      <IsFetching
        isFetching={valoracionStates.get("isFetching")}
        showChildren={true}
        mainCss={mainCss}
      >
        {this.content()}
      </IsFetching>
    );
  }
}

Valoracion.propTypes = {
  generalStates: PropTypes.any.isRequired,
  setErrorValoracion: PropTypes.func.isRequired,
  sendValoracion: PropTypes.func.isRequired,
  valoracionStates: PropTypes.any.isRequired,
  setStar: PropTypes.func.isRequired,
  setServicioValoracion: PropTypes.func.isRequired,
  setOverStar: PropTypes.func.isRequired,
  setCommentValoracion: PropTypes.func.isRequired,
  setPudoResolverValoracion: PropTypes.func.isRequired,
  updateConversationButton: PropTypes.func.isRequired,
  conversationsStates: PropTypes.any.isRequired
};
