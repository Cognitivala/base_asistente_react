import React, { Component } from "react";
import PropTypes from "prop-types";
import IsFetching from "../modules/is-fetching";

export default class Valoracion extends Component {
  constructor(props) {
    super(props);
    this.clickStar = this.clickStar.bind(this);
    this.setPudoResolver = this.setPudoResolver.bind(this);
    this.setComment = this.setComment.bind(this);
    this.valorar = this.valorar.bind(this);
    this.closeValoracion = this.closeValoracion.bind(this);
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
    debugger
    const { valoracionStates, generalStates } = this.props,
      general = generalStates.toJS(),
      comentario = valoracionStates.get("comment"),
      pudo_resolver = valoracionStates.get("pudoResolver") ? "Si" : "No",
      valor = valoracionStates.get("stars"),
      args = {
        general,
        valoracion:{
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

  closeValoracion(e){
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
    let pudoResolverError = false ,commentError = false;

    if(!comment){
      commentError = true;
    }
    if (stars <= 3) {
      if (!pudoResolver) {
        pudoResolverError = true;
      }
    }
    if(commentError || pudoResolverError){
      const data = {
        error:true,
        commentError,
        pudoResolverError
      }
      this.props.setErrorValoracion(data);
    }else{
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

  header() {
    return (
      <div className="header">
        <div className="close-form">
          <button type="button" onClick={this.closeValoracion}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="icon">
          <i className="fas fa-check" />
        </div>
        <p className="title">¿Cómo evalúas en general esta conversación?</p>
        <p>Califica en una de 1 a 5, donde 5 es muy buena y 1 es muy mala</p>
      </div>
    );
  }

  star(i, classCss) {
    return (
      <a
        key={i}
        href="#;"
        className={classCss}
        rel="mx"
        onClick={this.clickStar}
      >
        <span>{i}</span>
        <i className="fas fa-star" />
      </a>
    );
  }

  ratingStars(stars) {
    let content = [];
    for (let i = 0; i < 5; i++) {
      if (stars === 0) {
        content.push(this.star(i + 1, ""));
      } else if (i < stars) {
        content.push(this.star(i + 1, "active"));
      } else {
        content.push(this.star(i + 1, ""));
      }
    }
    return (
      <fieldset>
        <div className="ratingStars">{content}</div>
      </fieldset>
    );
  }

  thanThree(stars,commentError,pudoResolverError) {    
    let commentCss = commentError?"error":"",
      pudoResolverCss = pudoResolverError?"error":"";
    if (stars === 0) {
      return <div className="bkg-gray hide" />;
    } else if (stars <= 3) {
      return (
        <div className="bkg-gray" id="less-than-3">
          {this.radios(pudoResolverCss)}
          <fieldset>
            <legend>Cuéntanos ¿qué mejorarías?</legend>
            <textarea
              name="por-que"
              id="por-que"
              rows="3"
              onKeyUp={this.setComment}
              className={commentCss}
            />
          </fieldset>
        </div>
      );
    } else {
      return (
        <div className="bkg-gray" id="more-than-3">
          <fieldset>
            <legend>Cuéntanos ¿por qué evalúas con esta nota?</legend>
            <textarea
              name="por-que"
              id="por-nota"
              rows="3"
              onKeyUp={this.setComment}
              className={commentCss}
            />
          </fieldset>
        </div>
      );
    }
  }

  radios(pudoResolverCss) {
    return (
      <fieldset className="radios">
        <legend>¿Pudiste resolver tu inquietud en esta conversación?</legend>
        <label>
          <div className="round">
            Sí
            <input
              type="radio"
              name="decision"
              value="si"
              onClick={this.setPudoResolver}
              className={pudoResolverCss}
            />
            <div className="circle" />
          </div>
        </label>
        <label>
          <div className="round">
            No
            <input
              type="radio"
              name="decision"
              value="no"
              onClick={this.setPudoResolver}
              className={pudoResolverCss}
            />
            <div className="circle" />
          </div>
        </label>
      </fieldset>
    );
  }

  error(error) {
    if (error) {
      return (
        <div className="error-msg show">
          <p>
            <strong>Ups! Tenemos un problema</strong>
          </p>
          <p>Favor verifique sus datos e intente nuevamente.</p>
        </div>
      );
    } else {
      return (
        <div className="error-msg">
        </div>
      );
    }
  }

  button(button) {
    if (button) {
      return (
        <button type="button" data-msg="Sí" onClick={this.valorar}>
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
    const { valoracionStates } = this.props,
      stars = valoracionStates.get("stars"),
      button = valoracionStates.get("button"),
      error = valoracionStates.get("error"),
      commentError = valoracionStates.get("commentError"),
      pudoResolverError = valoracionStates.get("pudoResolverError");
    return (
      <div id="modal-valoracion" className="mymodal show">
        <div className="overflow">
          <div className="myflex">
            <div id="valoracion" className="container-form">
              <form name="form2" id="form-valoracion" autoComplete="off">
                {this.header()}
                {this.ratingStars(stars)}
                {this.thanThree(stars,commentError,pudoResolverError)}
                {this.button(button)}
              </form>
            </div>
          </div>
        </div>
        {this.error(error)}
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
  closeValoracion: PropTypes.func.isRequired
};
