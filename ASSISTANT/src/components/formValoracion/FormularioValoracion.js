import React, { Component } from "react";
import Star from './Star';

import './FormValoracion.scss';

const style = {
    boxStar: {
        width: '100%',
        display: 'flex',
        alignItems:'flex-end',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    }
}

const totalStars = 5;

class FormularioValoracion extends Component {
  state = {
    respuesta: "si",
    starsSelected: 0,
    mensajeAdicional: ""
  };

  

  handleOptionChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
        this.setState({
            ...this.state,
            respuesta: e.target.value
        });
    } else {
        this.setState({
            ...this.state,
            respuesta: e.target.value
        });
    }
};

    
    enviarValoracion = (e) =>{
        console.log('Llegué a enviarValoracion:: ');
        e.preventDefault();
        if(this.state.respuesta === null || this.state.starsSelected === 0 || this.state.mensajeAdicional === '') {
            return false;
        }

        let resolvio = null;
        if (this.state.respuesta === 'si') {
            resolvio = 1;
        } else {
            resolvio = 0;
        }
        const data = {
            input: "in",
            output: "out",
            // cid: general.cid,
            id_data_canal: 123,
            id_canal: 1,
            resolvio: resolvio,
            valoracion: this.state.starsSelected,
            comentario: this.state.mensajeAdicional,
        }
        console.log('DATA VALORACIÓN:: ', data);
        // sendLike(data, general);
        debugger;
        // sendValoracion(data, general);
    }

  render() {
    return (
      <div className="conversationBubbleForm Send">
        {/* <img className={mainCss.RoundedImg} src={} alt="" /> */}

        <div className="containerForm">
          <form autoComplete="off" >
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
                  <div
                    className={this.state.respuesta === "si" ? "active circle" : " circle"}
                  ></div>
                  Sí
                  <input
                    type="radio"
                    name="desicion"
                    value="si"
                    checked={this.state.respuesta === "si"}
                    onChange={this.handleOptionChange}
                  />
                </div>
              </label>
              <label>
                <div className="round">
                  <div
                    className={this.state.respuesta === "no" ? "active circle" : " circle"}
                  ></div>
                  No
                  <input
                    type="radio"
                    name="desicion"
                    value="no"
                    checked={this.state.respuesta === "no"}
                    onChange={this.handleOptionChange}
                  />
                </div>
              </label>
            </fieldset>

            <fieldset>
              {/* <StarRating totalStars={5} /> */}

              <div className="star-rating">
                <div style={style.boxStar}>
                  {[...Array(totalStars)].map((n, i) => (
                    <Star
                      key={i}
                      selected={i < this.state.starsSelected}
                      onClick={() => this.setState({starsSelected: i + 1})}
                    />
                  ))}
                </div>

                <div>
                  {this.state.starsSelected === 0 && <p>Seleccione su valoración</p>}
                  {this.state.starsSelected === 1 && (
                    <p>
                      Muy insatisfecho{" "}
                      <span role="img" aria-label="">
                        😡
                      </span>
                    </p>
                  )}
                  {this.state.starsSelected === 2 && (
                    <p>
                      No fue de mucha ayuda{" "}
                      <span role="img" aria-label="">
                        😞
                      </span>
                    </p>
                  )}
                  {this.state.starsSelected === 3 && (
                    <p>
                      Me ayudó, pero necesita mejorar{" "}
                      <span role="img" aria-label="">
                        😐
                      </span>
                    </p>
                  )}
                  {this.state.starsSelected === 4 && (
                    <p>
                      ¡Buen servicio!{" "}
                      <span role="img" aria-label="">
                        🙂
                      </span>
                    </p>
                  )}
                  {this.state.starsSelected === 5 && (
                    <p>
                      ¡Excelente servicio!{" "}
                      <span role="img" aria-label="">
                        😃
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend style={{ fontWeight: 100, marginBottom: "0.8rem" }}>
                ¡Gracias por la valoración! Nos ayuda a seguir mejorando. Puedes
                dejar un mensaje adicional en el espacio siguiente
              </legend>
              <textarea
                name="por-que"
                rows="2"
                onChange={e => this.setState({...this.state, mensajeAdicional: e.target.value})}
              ></textarea>
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

export default FormularioValoracion;
