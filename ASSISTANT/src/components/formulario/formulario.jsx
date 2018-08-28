import React, { Component } from "react";
import FormHeader from "./form-header";
import FormError from "./form-error";


export default class Formulario extends Component {
  constructor(props) {
    super(props);
  }

  content() {
    const { formularioStates } = this.props,
      error = formularioStates.get('error');

    return (
      <div class="mymodal show">
        <div class="overflow">
          <div id="login" class="container-form">
            <form
              name="form3"
              id="form-contacto"
              data-end="formularioContacto"
              autocomplete="off"
            >
              <FormHeader
                icon={"fas fa-user-tie"}
                textA={"Por favor ingrese sus datos y"}
                textStrong={
                  "uno de nuestros ejecutivos le responderá a la brevedad posible"
                }
                textB={"o en horario hábil siguiente"}
              />

              <p class="red">Todos los campos son obligatorios</p>

              <fieldset>
                <legend>Nombre</legend>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej. Juan"
                  autocomplete="off"
                />
              </fieldset>

              <fieldset>
                <legend>Apellido</legend>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Ej. Pérez"
                  autocomplete="off"
                />
              </fieldset>

              <fieldset>
                <legend>RUT</legend>
                <input
                  type="text"
                  name="rut2"
                  placeholder="Ej. 11111111-1"
                  maxlength="12"
                  autocomplete="off"
                />
              </fieldset>

              <fieldset>
                <legend>Teléfono</legend>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Ej. 912345678"
                  autocomplete="off"
                />
              </fieldset>

              <fieldset>
                <legend>Correo electrónico</legend>
                <input
                  type="email"
                  name="email"
                  placeholder="Ej. nombre@micorreo.cl"
                  autocomplete="off"
                />
              </fieldset>

              <fieldset>
                <legend>Comentario</legend>
                <textarea
                  name="comentario"
                  rows="5"
                  placeholder="Escriba aquí su comentario"
                  autocomplete="off"
                />
              </fieldset>

              {/* <button type="button" data-func="validateFieldsTest">Enviar</button> */}

              <button id="send-form-contacto" data-func="sendDataForm">
                Enviar
              </button>

              {/* <div class="spinner-holder">
                <div class="spinner">Loading...</div>
              </div> */}
            </form>
          </div>
        </div>
        <FormError error={error} />
        <div class="overlay" />
      </div>
    );
  }

  render() {
    return this.content();
  }
}
