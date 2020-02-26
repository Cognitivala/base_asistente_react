import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

import logoCognitiva from '../../assets/images/powered-by-cognitiva.svg';

import "./FormValoracion.scss";

const style = {
  boxStar: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginBottom: "10px"
  },
  disable: {
    background: '#e4e4e4',
    color: '#757575'
  }
};

const totalStars = 5;

class FormularioValoracion extends Component {
  state = {
    respuesta: null,
    starsSelected: 0,
    mensajeAdicional: "",
    campoRequerido: false
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
      this.state.respuesta === null &&
      this.state.starsSelected === 0 &&
      this.state.mensajeAdicional === ""
    ) {
      this.setState({campoRequerido: true});
      return false;
    } else if (this.state.respuesta === null ) {
      this.setState({campoRequerido: true});
      return false;
    }
    else if (this.state.starsSelected === 0 ) {
      this.setState({campoRequerido: true});
      return false;
    } else if (this.state.starsSelected > 3 ) {
      this.setState({campoRequerido: false});
    }
    else if (this.state.starsSelected <= 3 && this.state.mensajeAdicional === "" ) {
      this.setState({campoRequerido: true});
      return false;
    }

    // if (
    //   this.state.respuesta === null ||
    //   this.state.starsSelected === 0 ||
    //   this.state.mensajeAdicional === ""
    // ) {
    //   return false;
    // }

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
      valoracion: this.state.starsSelected,
      comentario: this.state.mensajeAdicional
    };
    // sendLike(data, general);
    await sendValoracion(data, general);
  };

  limpiarError() {
    if ( this.state.starsSelected > 0 && this.state.starsSelected <= 3 ){
      this.setState({campoRequerido: true});
    } else if( this.state.mensajeAdicional !== "") {
      this.setState({campoRequerido: false});
    } else if( this.state.starsSelected > 3) {
      this.setState({campoRequerido: false});
    } else {
      this.setState({campoRequerido: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.starsSelected !== this.state.starsSelected) {
      if ( this.state.starsSelected > 3  ) {
        this.setState({campoRequerido: false});
      }
    }
  }

  render() {
    return (
      <div className="conversationBubbleForm Send">
        {/* <img className={mainCss.RoundedImg} src={} alt="" /> */}

        <div className="containerForm">
          <form autoComplete="off" onSubmit={this.enviarValoracion}>
            <div className="headerForm">
              <p>
                Gracias por utilizar nuestro chat. No dude en dejarnos cualquier
                comentario adicional.
              </p>
            </div>

            <fieldset className="radios">
              <legend>¿Su caso o inquietud fueron resueltas?</legend>
              <label>
                <div className="round">
                  <div className={ this.state.respuesta === "si" ? "active circle" : " circle" }></div>
                  Sí
                  <input type="radio" name="desicion" value="si" checked={this.state.respuesta === "si"} onChange={this.handleOptionChange} onKeyUp={this.limpiarError.bind(this)} />
                </div>
              </label>
              <label>
                <div className="round">
                  <div className={ this.state.respuesta === "no" ? "active circle" : " circle" }></div>
                  No
                  <input type="radio" name="desicion" value="no" checked={this.state.respuesta === "no"} onChange={this.handleOptionChange} onKeyUp={this.limpiarError.bind(this)} />
                </div>
              </label>

              { this.state.campoRequerido && this.state.respuesta === null && <legend style={{color: '#ff2200', fontWeight: 700}}>*Este campo es obligatorio</legend> }
            </fieldset>

            <fieldset>

              <div className="star-rating">
                <div style={style.boxStar}>
                  {[...Array(totalStars)].map((n, i) => (
                    <Star key={i} selected={i < this.state.starsSelected}  onClick={() => this.setState({ starsSelected: i + 1 })} />
                  ))}
                </div>

                <div>
                  {this.state.starsSelected === 0 && (
                    <p>Seleccione su valoración</p>
                  )}
                  {this.state.starsSelected === 1 && ( <p> Muy insatisfecho <span role="img" aria-label=""> 😡</span></p> )}
                  {this.state.starsSelected === 2 && ( <p>No fue de mucha ayuda <span role="img" aria-label=""> 😞</span></p> )}
                  {this.state.starsSelected === 3 && ( <p>Me ayudó, pero necesita mejorar <span role="img" aria-label=""> 😐</span></p> )}
                  {this.state.starsSelected === 4 && ( <p>¡Buen servicio! <span role="img" aria-label=""> 🙂</span></p> )}
                  {this.state.starsSelected === 5 && ( <p>¡Excelente servicio! <span role="img" aria-label=""> 😃</span></p> )}

                  { this.state.campoRequerido && this.state.starsSelected === 0 && <legend style={{color: '#ff2200'}}>*Este campo es obligatorio</legend> }
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend style={{ fontWeight: 100, marginBottom: "0.8rem" }}>
                ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes dejar un mensaje adicional en el espacio siguiente:
              </legend>
              <textarea name="mensajeAdicional" rows="2" onKeyUp={this.limpiarError.bind(this)} style={ this.state.campoRequerido && this.state.mensajeAdicional === "" && this.state.starsSelected <= 3  ? { border: '.1rem solid #ff2200' } : null} onChange={ e => this.setState({ ...this.state, mensajeAdicional: e.target.value }) }></textarea>

              { this.state.campoRequerido && this.state.mensajeAdicional === "" && this.state.starsSelected <= 3 && <legend style={{color: '#ff2200'}}>*Este campo es obligatorio</legend> }
            </fieldset>

            <fieldset>
              <button type="submit" style={this.state.campoRequerido && this.state.mensajeAdicional === "" ? style.disable : null}>Valorar</button>
            </fieldset>

            <div>
                    <img src={logoCognitiva} alt="Cognitiva"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

FormularioValoracion.propTypes = {
    generalStates: PropTypes.any.isRequired,
    sendValoracion: PropTypes.func.isRequired
};

export default FormularioValoracion;
