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
    this.setPudoResolver = this.setPudoResolver.bind(this);
    this.setComment = this.setComment.bind(this);
    this.valorar = this.valorar.bind(this);
    this.closeValoracion = this.closeValoracion.bind(this);
  }

  componentWillMount() {
    const { ayudaStates, inputStates, customParamsStates } = this.props,
      help = customParamsStates.getIn(["customParams", "settings", "help"]);
    if (help && ayudaStates.get("open")) this.props.closeHelp();
    if (help && ayudaStates.get("enabled")) this.props.disabledHelp();
    if (inputStates.get("enabled")) this.props.disabledInput();
  }

  //// VALORACION ////

  //   sendValueMsg(yaVal, yaCont, yaSol, yaSum, msg) {
  //     var args = {
  //       cid: getCid,
  //       msg: msg,
  //       id_cliente: getSession,
  //       token: getToken,
  //       origen: origen,
  //       yaValoro: yaVal,
  //       yaContacto: yaCont,
  //       yaSolicito: yaSol,
  //       yaSuma: yaSum
  //     }
  //     var promise = $.ajax({
  //       type: "POST",
  //       url: this.ajaxCall,
  //       crossDomain: true,
  //       data: JSON.stringify(args),
  //       contentType: "application/json",
  //       dataType: "json"
  //     });
  //     promise.done(response => {
  //       setTimeout(() => {
  //         this.transversalResponseActions(response);
  //       }, 500);
  //     });
  //   }
  //// FIN VALORACION ////

  clickStar(e) {
    e.preventDefault();
    const _this = e.target.tagName === "I" ? e.target.closest("a") : e.target,
      star = parseInt(_this.getElementsByTagName("span")[0].innerText);
    this.setStar(star);
  }

  requestValue() {
    debugger;
    const { valoracionStates, generalStates } = this.props,
      general = generalStates.toJS(),
      comentario = valoracionStates.get("comment"),
      pudo_resolver = valoracionStates.get("pudoResolver") ? "Si" : "No",
      valor = valoracionStates.get("stars"),
      args = {
        general,
        valoracion: {
          comentario,
          pudo_resolver,
          valor
        },
        enabled: false
      };
    this.props.sendValoracion(args);

    // var promise = $.ajax({
    //   type: "POST",
    //   url: getPath + "mad/valorar",
    //   crossDomain: true,
    //   data: JSON.stringify(args),
    //   contentType: "application/json",
    //   dataType: "json"
    // });

    // promise.done(response => {
    //   yaValoro = "True";
    //   Main.sendValueMsg(yaValoro, yaContacto, yaSolicito, yaSuma, "No");
    //   $("#modal-valoracion").removeClass("show");
    //   modalOpen = false;
    //   if (Main.inIframe() == true) {
    //     Main.toggleActiveAyuda();
    //   }
    // });
  }

  closeValoracion(e) {
    const { generalStates } = this.props,
      msg = e.target.dataset.msg,
      general = generalStates.toJS(),
      conversation = {
        general,
        msg: [msg],
        send: "to",
        enabled: false
      };
    this.props.closeValoracion(conversation);
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
    if (stars <= 3) {
      if (!pudoResolver) {
        pudoResolverError = true;
      }
    }
    if (commentError || pudoResolverError) {
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

  setStar(star) {
    this.props.setStar(star);
  }

  setPudoResolver(e) {
    this.props.setPudoResolverValoracion(e.target.value);
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
      button = valoracionStates.get("button"),
      error = valoracionStates.get("error"),
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
                <RatingStars clickStar={this.clickStar} stars={stars} colorHeader={colorHeader}/>
                <ValoracionThanThree
                  stars={stars}
                  commentError={commentError}
                  pudoResolverError={pudoResolverError}
                  setPudoResolver={this.setPudoResolver}
                  setComment={this.setComment}
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
    const { valoracionStates } = this.props;
    return (
      <IsFetching
        isFetching={valoracionStates.get("isFetching")}
        showChildren={true}
      >
        {this.content()}
      </IsFetching>
    );
  }
}

Valoracion.propTypes = {
  valoracionStates: PropTypes.any.isRequired,
  setStar: PropTypes.func.isRequired,
  setPudoResolverValoracion: PropTypes.func.isRequired,
  setCommentValoracion: PropTypes.func.isRequired,
  closeValoracion: PropTypes.func.isRequired,
  ayudaStates: PropTypes.any.isRequired,
  closeHelp: PropTypes.func.isRequired,
  disabledHelp: PropTypes.func.isRequired,
  inputStates: PropTypes.any.isRequired,
  disabledInput: PropTypes.func.isRequired,
  customParamsStates: PropTypes.any.isRequired
};
