import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Valoracion extends Component {
  constructor(props) {
    super(props);
  }
  
  //// VALORACION ////
  //   $(".ratingStars a").click(function(ev) {
  //     ev.preventDefault();
  //     $(".ratingStars a").removeClass("active");
  //     $(this)
  //       .parents("form")
  //       .find("button")
  //       .prop("disabled", false);
  //     $(this).addClass("active");
  //     getIndex = $(this).index();

  //     stars = getIndex + 1;

  //     if (stars <= 3) {
  //       $("#more-than-3").slideUp(300);
  //       $("#less-than-3").slideDown(300);
  //     } else {
  //       $("#more-than-3").slideDown(300);
  //       $("#less-than-3").slideUp(300);
  //     }

  //     for(var i = 0; i <= getIndex; i++) {
  //       $('.ratingStars a:nth-child('+i+')').addClass('active');
  //     }

  //   });
  //   valorar(index) {
  //     decision = $('#valoracion input[name="decision"]');

  //     let porQue = $("#por-que").val(),
  //       porNota = $("#por-nota").val();

  //     if (index <= 3) {
  //       for (var i = 0; i < decision.length; i++) {
  //         if (decision[i].checked == true) {
  //           resolver = decision[i].value;
  //           break;
  //         }
  //       }
  //       if (resolver != "") {
  //         commentMejorarias = porQue;
  //         Main.requestValue();
  //       } else {
  //         Main.showError();
  //       }
  //     } else {
  //       commentMejorarias = porNota;
  //       Main.requestValue();
  //     }
  //   }

  //   sendValue(ev) {
  //     ev.preventDefault();
  //     Main.valorar(stars);
  //   }

  //   requestValue() {
  //     var args = {
  //       comentario: commentMejorarias,
  //       valor: stars,
  //       origen: origen,
  //       cid: getCid,
  //       id_nodo: nodoid,
  //       intent: getIntent,
  //       pudo_resolver: resolver,
  //       auth: auth
  //     };
  //     var promise = $.ajax({
  //       type: "POST",
  //       url: getPath + "mad/valorar",
  //       crossDomain: true,
  //       data: JSON.stringify(args),
  //       contentType: "application/json",
  //       dataType: "json"
  //     });
  //     promise.done(response => {
  //       yaValoro = "True";
  //       Main.sendValueMsg(yaValoro, yaContacto, yaSolicito, yaSuma, 'No');
  //       $("#modal-valoracion").removeClass("show");
  //       modalOpen = false;
  //       if (Main.inIframe() == true) {
  //         Main.toggleActiveAyuda();
  //       }
  //     });
  //   }

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

  content() {
    const { valoracionStates } = this.props;
    return (
      <div id="modal-valoracion" class="mymodal show">
        <div class="overflow">
          <div class="myflex">
            <div id="valoracion" class="container-form">
              <form name="form2" id="form-valoracion" autocomplete="off">
                <div class="header">
                  <div class="close-form">
                    <button data-msg="No" data-func="sendButtonresponse">
                      <i class="fas fa-times" />
                    </button>
                  </div>
                  <div class="icon">
                    <i class="fas fa-check" />
                  </div>
                  <p class="title">
                    ¿Cómo evalúas en general esta conversación?
                  </p>
                  <p>
                    Califica en una de 1 a 5, donde 5 es muy buena y 1 es muy
                    mala
                  </p>
                </div>

                <fieldset>
                  <div class="ratingStars">
                    <a href="#;" rel="mx">
                      <span>1</span>
                      <i class="fas fa-star" />
                    </a>
                    <a href="#;" rel="mx">
                      <span>2</span>
                      <i class="fas fa-star" />
                    </a>
                    <a href="#;" rel="mx">
                      <span>3</span>
                      <i class="fas fa-star" />
                    </a>
                    <a href="#;" rel="mx">
                      <span>4</span>
                      <i class="fas fa-star" />
                    </a>
                    <a href="#;" rel="mx">
                      <span>5</span>
                      <i class="fas fa-star" />
                    </a>
                  </div>
                </fieldset>

                <div class="bkg-gray" id="more-than-3">
                  <fieldset>
                    <legend>Cuéntanos ¿por qué evalúas con esta nota?</legend>
                    <textarea name="por-que" id="por-nota" rows="3" />
                  </fieldset>
                </div>

                <div class="bkg-gray" id="less-than-3">
                  <fieldset class="radios">
                    <legend>
                      ¿Pudiste resolver tu inquietud en esta conversación?
                    </legend>
                    <label>
                      <div class="round">
                        Sí
                        <input type="radio" name="decision" value="si" />
                        <div class="circle" />
                      </div>
                    </label>
                    <label>
                      <div class="round">
                        No
                        <input type="radio" name="decision" value="no" />
                        <div class="circle" />
                      </div>
                    </label>
                  </fieldset>
                  <fieldset>
                    <legend>Cuéntanos ¿qué mejorarías?</legend>
                    <textarea name="por-que" id="por-que" rows="3" />
                  </fieldset>
                </div>

                <button data-msg="Sí" data-func="sendValue" disabled>
                  Valorar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="error-msg">
          <p>
            <strong>Ups! Tenemos un problema</strong>
          </p>
          <p>Favor verifique sus datos e intente nuevamente.</p>
        </div>

        <div class="overlay" />
      </div>
    );
  }

  render() {
    return this.content();
  }
}

Valoracion.propTypes = {
    valoracionStates: PropTypes.any.isRequired
};
