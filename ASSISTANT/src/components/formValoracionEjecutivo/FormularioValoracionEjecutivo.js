import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

import "./FormValoracionEjecutivo.scss";

const style = {
  boxStar: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginBottom: "10px"
  }
};

const totalStars = 5;

class FormularioValoracionEjecutivo extends Component {
  state = {
    respuesta: null,
    starsSelectedAtencion: 0,
    starsSelectedEjecutivo: 0,
    mensajeAdicional: ""
  };

  handleOptionChange = e => {
    // console.log(e.target.value);
    if (e.target.value) {
      this.setState({ ...this.state, respuesta: e.target.value });
    } else {
      this.setState({ ...this.state, respuesta: e.target.value });
    }
  };

  enviarValoracion = async (e) => {
    e.preventDefault();
    if (
      this.state.respuesta === null ||
      this.state.starsSelectedAtencion === 0 ||
      this.state.starsSelectedEjecutivo === 0 ||
      this.state.mensajeAdicional === ""
    ) {
      return false;
    }

    const { generalStates, sendValoracion } = this.props;
    const general = generalStates.toJS();

    let resolvio = null;
    if (this.state.respuesta === "si") {
      resolvio = 1;
    } else {
      resolvio = 0;
    }

    const data = {
      input: "in",
      output: "out",
      cid: general.cid,
      id_data_canal: 123,
      id_canal: 1,
      resolvio: resolvio,
      valoracion: this.state.starsSelectedAtencion,
      valoracionEjecutivo : this.state.starsSelectedEjecutivo,
      comentario: this.state.mensajeAdicional
    };
    // sendLike(data, general);
   await sendValoracion(data, general)
   
  };

  render() {
    return (
      <div className="conversationBubbleForm Send">
        {/* <img className={mainCss.RoundedImg} src={} alt="" /> */}

        <div className="containerForm">
          <form autoComplete="off" onSubmit={this.enviarValoracion}>
            <div className="headerForm">
              <p>
                Gracias por utilizar nuestro chat. Por favor ayudanos a mejorar, respondiendo las siguientes preguntas:
              </p>
            </div>

            <fieldset className="radios">
              <legend>¿Tu caso o inquietud fueron resueltas?</legend>
              <label>
                <div className="round">
                  <div className={ this.state.respuesta === "si" ? "active circle" : " circle" }></div>
                  Sí
                  <input type="radio" name="desicion" value="si" checked={this.state.respuesta === "si"} onChange={this.handleOptionChange} />
                </div>
              </label>
              <label>
                <div className="round">
                  <div className={ this.state.respuesta === "no" ? "active circle" : " circle" }></div>
                  No
                  <input type="radio" name="desicion" value="no" checked={this.state.respuesta === "no"} onChange={this.handleOptionChange} />
                </div>
              </label>
            </fieldset>

          
            <fieldset>
            <legend style={{ fontWeight: 100, marginBottom: "0.8rem" }}>¿Como evalúas el chat automatizado?</legend>

            <div className="star-rating">
            <div style={style.boxStar}>
              {[...Array(totalStars)].map((n, i) => (
                <Star key={i} selected={i < this.state.starsSelectedAtencion} onClick={() => this.setState({ starsSelectedAtencion: i + 1 })} />
              ))}
            </div>

            <div>
            {/*   {this.state.starsSelected === 0 && (
                <p>Selecciona tu valoración</p>
              )} */}
              {this.state.starsSelectedAtencion === 1 && ( <p> Muy insatisfecho <span role="img" aria-label=""> 😡</span></p> )}
              {this.state.starsSelectedAtencion === 2 && ( <p>No fue de mucha ayuda <span role="img" aria-label=""> 😞</span></p> )}
              {this.state.starsSelectedAtencion === 3 && ( <p>Me ayudó, pero necesita mejorar <span role="img" aria-label=""> 😐</span></p> )}
              {this.state.starsSelectedAtencion === 4 && ( <p>¡Buen servicio! <span role="img" aria-label=""> 🙂</span></p> )}
              {this.state.starsSelectedAtencion === 5 && ( <p>¡Excelente servicio! <span role="img" aria-label=""> 😃</span></p> )}
            </div>
          </div>
          </fieldset>

              <fieldset>
              <legend style={{ fontWeight: 100, marginBottom: "0.8rem" }}>¿Como evalúas la atencion del ejecutivo?</legend>
          <div className="star-rating">
          <div style={style.boxStar}>
            {[...Array(totalStars)].map((n, i) => (
              <Star key={i} selected={i < this.state.starsSelectedEjecutivo} onClick={() => this.setState({ starsSelectedEjecutivo: i + 1 })} />
            ))}
          </div>

          <div>
          {/*   {this.state.starsSelected === 0 && (
              <p>Selecciona tu valoración</p>
            )} */}
            {this.state.starsSelectedEjecutivo === 1 && ( <p> Muy insatisfecho <span role="img" aria-label=""> 😡</span></p> )}
            {this.state.starsSelectedEjecutivo === 2 && ( <p>No fue de mucha ayuda <span role="img" aria-label=""> 😞</span></p> )}
            {this.state.starsSelectedEjecutivo === 3 && ( <p>Me ayudó, pero necesita mejorar <span role="img" aria-label=""> 😐</span></p> )}
            {this.state.starsSelectedEjecutivo === 4 && ( <p>¡Buen servicio! <span role="img" aria-label=""> 🙂</span></p> )}
            {this.state.starsSelectedEjecutivo === 5 && ( <p>¡Excelente servicio! <span role="img" aria-label=""> 😃</span></p> )}
          </div>
          </div>
              </fieldset>
          
{/* 
            <fieldset>
              <div className="star-rating">
                <div style={style.boxStar}>
                  {[...Array(totalStars)].map((n, i) => (
                    <Star key={i} selected={i < this.state.starsSelected} onClick={() => this.setState({ starsSelected: i + 1 })} />
                  ))}
                </div>

                <div>
                  {this.state.starsSelected === 0 && (
                    <p>Selecciona tu valoración</p>
                  )}
                  {this.state.starsSelected === 1 && ( <p> Muy insatisfecho <span role="img" aria-label=""> 😡</span></p> )}
                  {this.state.starsSelected === 2 && ( <p>No fue de mucha ayuda <span role="img" aria-label=""> 😞</span></p> )}
                  {this.state.starsSelected === 3 && ( <p>Me ayudó, pero necesita mejorar <span role="img" aria-label=""> 😐</span></p> )}
                  {this.state.starsSelected === 4 && ( <p>¡Buen servicio! <span role="img" aria-label=""> 🙂</span></p> )}
                  {this.state.starsSelected === 5 && ( <p>¡Excelente servicio! <span role="img" aria-label=""> 😃</span></p> )}
                </div>
              </div>
            </fieldset> */}

            <fieldset>
              <legend style={{ fontWeight: 100, marginBottom: "0.8rem" }}>
               Puedes dejar un mensaje adicional en el espacio siguiente:
              </legend>
              <textarea name="mensajeAdicional" rows="2" onChange={ e => this.setState({ ...this.state, mensajeAdicional: e.target.value }) }></textarea>
            </fieldset>

            <fieldset>
              <button type="submit">Valorar</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

FormularioValoracionEjecutivo.propTypes = {
    generalStates: PropTypes.any.isRequired,
    sendValoracion: PropTypes.func.isRequired
};

export default FormularioValoracionEjecutivo;
