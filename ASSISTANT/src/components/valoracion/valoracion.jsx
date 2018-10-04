import React, { Component } from "react";
import PropTypes from "prop-types";
import IsFetching from "../modules/is-fetching";
import ValoracionHeader from "./valoracion-header";
import RatingStars from "./rating-stars";
import ValoracionThanThree from "./valoracion-than-three";
import ValoracionError from "./valoracion-error";

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
  }

  clickStar(e) {
    e.preventDefault();
    const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
    const star = parseInt(_this.tagName==="SPAN"?_this.innerText:_this.getElementsByTagName("span")[0].innerText);
    this.props.setStar(star);
  }

  overStar(e){
    e.preventDefault();
    const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target;
    const star = parseInt(_this.tagName==="SPAN"?_this.innerText:_this.getElementsByTagName("span")[0].innerText);
    this.props.setOverStar(star);
  }

  overStarDefault(e){
    e.preventDefault();
    this.props.setOverStar(0);
  }

  requestValue() {
    const { valoracionStates, generalStates, conversationsStates } = this.props,
      general = generalStates.toJS(),
      comentario = valoracionStates.get("comment"),
      pudo_resolver = valoracionStates.get("pudoResolver") ? "Si" : "No",
      valoracion = valoracionStates.get("stars"),
      conversaciones = conversationsStates.get('conversations'),
      sizeConv = conversationsStates.get("conversations").size,
      input = conversaciones.get(sizeConv-4).get("msg").get(0),
      output =conversaciones.get(sizeConv-3).get("msg").get(0),
      args = {
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
      stars = valoracionStates.get("stars"),
      pudoResolver = valoracionStates.get("pudoResolver"),
      comment = valoracionStates.get("comment");
    let pudoResolverError = false,
      commentError = false;

    if (!comment) {
      commentError = true;
    }
    // if (stars <= 3) {
    //   if (!pudoResolver) {
    //     pudoResolverError = true;
    //   }
    // }
    // if (commentError || pudoResolverError) {
    if (commentError) {
      const data = {
        error: true,
        commentError,
        pudoResolverError
      };
      this.props.setErrorValoracion(data);
    } else {
      this.requestValue();
    }
  }

  setPudoResolver(e) {
    debugger
    this.props.setPudoResolverValoracion(e.target.value==="si"?true:false);
  }

  setComment(e) {
    this.props.setCommentValoracion(e.target.value);
  }

  button(button, colorHeader) {

    if (button) {
      return (
        <button type="button" data-msg="Sí" onClick={this.valorar} style={{backgroundColor:colorHeader}}>
          Valorar
        </button>
      );
    } else {
      return (
        <button type="button" data-msg="Sí" disabled>
          Valorar
        </button>
      );
    }
  }

  content() {
    const { valoracionStates, customParamsStates } = this.props,
      stars = valoracionStates.get("stars"),
      over = valoracionStates.get("overStar"),
      button = valoracionStates.get("button"),
      error = valoracionStates.get("error"),
      pudoResolver = valoracionStates.get('pudoResolver'),
      colorHeader = customParamsStates.getIn(["customParams","colorHeader"]),
      commentError = valoracionStates.get("commentError"),
      pudoResolverError = valoracionStates.get("pudoResolverError");
    return (
      <div id="modal-valoracion" className="mymodal show">
        <div className="overflow">
          <div className="myflex">
            <div id="valoracion" className="container-form">
              <form name="form2" id="form-valoracion" autoComplete="off">
                <ValoracionHeader closeValoracion={this.closeValoracion} colorHeader={colorHeader}/>
                <RatingStars clickStar={this.clickStar} stars={stars} over={over} colorHeader={colorHeader} overStar={this.overStar} overStarDefault={this.overStarDefault}/>
                <ValoracionThanThree
                  stars={stars}
                  commentError={commentError}
                  pudoResolverError={pudoResolverError}
                  setPudoResolver={this.setPudoResolver}
                  setComment={this.setComment}
                  pudoResolver={pudoResolver}
                  colorHeader={colorHeader}
                />
                {this.button(button,colorHeader)}
              </form>
            </div>
          </div>
        </div>
        <ValoracionError error={error} />
        <div className="overlay" />
      </div>
    );
  }

  render() {
    const { valoracionStates, customParamsStates } = this.props,
    colorHeader = customParamsStates.getIn(["customParams","colorHeader"]);
    return (
      <IsFetching
        isFetching={valoracionStates.get("isFetching")}
        showChildren={true}
        colorHeader={colorHeader}
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
  setOverStar: PropTypes.func.isRequired,
  setCommentValoracion: PropTypes.func.isRequired,
  setPudoResolverValoracion: PropTypes.func.isRequired,
  updateConversationButton: PropTypes.func.isRequired,
  customParamsStates: PropTypes.any.isRequired,
  conversationsStates: PropTypes.any.isRequired
};
