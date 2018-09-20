import axios, { post } from "axios";
import Geocode from "react-geocode";
const APIURL = "http://asistente-react.mycognitiva.io/mad";

//GENERAL
function defaultGeneral() {
  return {
    type: "DEFAULT_GENERAL"
  };
}
function setGeneral(data) {
  return {
    type: "SET_GENERAL",
    data
  };
}
export function getLocation() {
  return function action(dispatch) {
    const geolocation = navigator.geolocation;
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error("Not Supported"));
      }

      geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        () => {
          console.log("Permiso denegado");
          //reject(new Error("Permission denied"));
        }
      );
    });

    location.then(res => {
      const keyGoogleMaps = "AIzaSyADG7P3Zw2isanqpUlGOHftJuB84FE8Efc",
        latitud = res.coords.latitude,
        longitud = res.coords.longitude;
      Geocode.setApiKey(keyGoogleMaps);
      Geocode.enableDebug();
      Geocode.fromLatLng(latitud, longitud).then(
        response => {
          const address = response.results[0].address_components[2].long_name;
          dispatch({ type: "SET_LOCATION", data: address });
        },
        error => {
          console.error(error);
        }
      );
    });
  };
}
export function setOrigen(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_ORIGEN", data });
  };
}
//LAUNCHER
export function closeLauncher() {
  return function action(dispatch) {
    dispatch({ type: "CLOSE_LAUNCHER" });
    dispatch({ type: "SET_NOTIFICATION", data: false });
  };
}
//CUSTOM PARAMS
export function getCustomParams() {
  return function action(dispatch) {
    dispatch(getCustomParamsStart());
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/customize_param",
      data: {id_cliente:"1"}
    });
    return request.then(
      response => {
        if (response.status === 200) {
          var item = {
            avatar: 'http://localhost:3000/images/avatar-default.jpg',
            colorHeader: '#012138',
            colorBtn: '#f8b31c',
            logo: 'http://logoschilevector.cl/img/url_foto_logo/1207-Duoc-UC.jpg',
            subtitulo: 'Asistencia digital',
            titulo: 'Duoc UC',
            url: 'http://asistente-react.mycognitiva.io/',
            userImg: null,
            estado: 1,
            settings: {
              keep_conversation: false,
              geolocalization: false,
              help: true,
              attach: false,
              emoji: false,
              voice: false
            }

          }
          // dispatch(getCustomParamsEnd(item));
          dispatch(getCustomParamsEnd(response.data));
        } else {
          dispatch(getCustomParamsError(response.statusText));
        }
      },
      err => {
        dispatch(
          getCustomParamsError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );
  };
}
function getCustomParamsError(error) {
  return {
    type: "GET_CUSTOM_PARAMS_ERROR",
    error
  };
}
function getCustomParamsStart() {
  return {
    type: "GET_CUSTOM_PARAMS_START"
  };
}
function getCustomParamsEnd(data) {
  return {
    type: "GET_CUSTOM_PARAMS_END",
    data
  };
}
export function setCustomParams(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_CUSTOM_PARAMS", data });
  };
}
//SALUDO
export function getSaludo() {
  return function action(dispatch) {
    dispatch(getSaludoStart());
    const data = { general: { cid: null, id_cliente: "1" }, msg: null },
      request = axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        url: APIURL + "/message",
        data: data
      });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = {};
          item.msg = [response.data.msg];
          item.send = "from";
          item.enabled = true;
          dispatch(pushConversation(item));
          dispatch(getSaludoEnd(item));
        } else {
          dispatch(getSaludoError(response.statusText));
        }
      },
      err => {
        dispatch(
          getSaludoEnd("Error de conexión con el servidor, intente nuevamente")
        );
      }
    );
  };
}
export function sendSaludo(data) {
  return function action(dispatch) {
    dispatch(pushConversation(data));
  };
}
function getSaludoStart() {
  return {
    type: "GET_SALUDO_START"
  };
}
function getSaludoEnd(data) {
  return {
    type: "GET_SALUDO_END",
    data
  };
}
function getSaludoError(error) {
  return {
    type: "GET_SALUDO_ERROR",
    error
  };
}
//ASSISTANT
export function openAssistant() {
  return function action(dispatch) {
    dispatch({ type: "OPEN_ASSISTANT" });
  };
}
export function closeAssistant() {
  return function action(dispatch) {
    dispatch(defaultGeneral());
    dispatch({ type: "CLOSE_ASSISTANT" });
    dispatch({ type: "SET_NOTIFICATION", data: false });
    dispatch({ type: "ENABLED_INPUT" });
    dispatch({ type: "ENABLED_HELP" });
    dispatch({ type: "TOGGLE_MINIMIZED", data: false });
    dispatch({ type: "OPEN_LAUNCHER" });
    dispatch(deleteHistory());
  };
}
export function toggleMinimizedAssistant(data) {
  return function action(dispatch) {
    dispatch({ type: "TOGGLE_MINIMIZED", data });
  };
}
export function defaultAssistant() {
  return function action(dispatch) {
    dispatch({ type: "TOGGLE_MINIMIZED", data: false });
  };
}
//AYUDA
export function getAyuda() {
  return function action(dispatch) {
    dispatch(getAyudaStart());
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/preguntas_ejemplo"
    });
    return request.then(
      response => {
        console.log(response)
        if (response.data.estado.codigoEstado === 200) {
          dispatch(getAyudaEnd(response.data.respuesta));
        } else {
          dispatch(getAyudaError(response.data.respuesta));
        }
      },
      err => {
        dispatch(
          getAyudaError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );

    setTimeout(() => {
      let item;
      item = [
        {
          action: false,
          collapse: false,
          description:
            "Te puedo ayudar a consultar tu remanente, formas para aumentarlo, detalle de tus cuotas de participaci\u00f3n, entre otras cosas.\r\nPreg\u00fantame algo o usa alguna de estas alternativas:",
          listChild: [
            {
              title: "\u00bfQu\u00e9 es el remanente?"
            },
            {
              title: "Detalle de las Cuotas de Participaci\u00f3n"
            },
            {
              title: "Formas de pago de la cuota de participaci\u00f3n"
            }
          ],
          title: "Remanente y Cuotas de Participaci\u00f3n"
        },
        {
          action: false,
          collapse: false,
          description:
            "Me puedes preguntar sobre la Cooperativa, sus representantes, como hacerte socio y todos los beneficios que Coopeuch te entrega en tu comuna, en comercios, salud, educaci\u00f3n, espect\u00e1culos y productos SUMA.\u00a0\u000bPreg\u00fantame algo o usa alguna de estas alternativas:",
          listChild: [
            {
              title: "\u00bfQuiero ser socio?"
            },
            {
              title: "\u00bfQu\u00e9 beneficios tengo? "
            },
            {
              title: "Quiero actualizar mis datos"
            }
          ],
          title: "La Cooperativa y sus beneficios"
        },
        {
          action: false,
          collapse: false,
          description:
            "Te puedo ayudar a obtener, bloquear y recuperar tus distintas claves, indicarte direcciones y horarios de oficinas y a comunicarte con Coopeuch.\u00a0\u000bPreg\u00fantame algo o usa alguna de estas alternativas:",
          listChild: [
            {
              title: "\u00bfDonde hay una oficina en mi comuna?"
            },
            {
              title: "\u00bfComo obtener o activar mi clave?"
            },
            {
              title: "\u00bfComo contacto a un ejecutivo?"
            }
          ],
          title: "Claves y Oficinas"
        }
      ];
      dispatch(getAyudaEnd(item));
    }, 500);
  };
}
function getAyudaStart() {
  return {
    type: "GET_AYUDA_START"
  };
}
function getAyudaEnd(data) {
  return {
    type: "GET_AYUDA_END",
    data
  };
}
function getAyudaError(error) {
  return {
    type: "GET_AYUDA_ERROR",
    error
  };
}
export function openHelp() {
  return function action(dispatch) {
    dispatch({ type: "OPEN_HELP" });
  };
}
export function closeHelp() {
  return function action(dispatch) {
    dispatch({ type: "CLOSE_HELP" });
  };
}
export function enabledHelp() {
  return function action(dispatch) {
    dispatch({ type: "ENABLED_HELP" });
  };
}
export function disabledHelp() {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_HELP" });
  };
}
export function showWarningHelp() {
  return function action(dispatch) {
    dispatch({ type: "SHOW_WARNING_HELP" });
  };
}
export function hideWarningHelp() {
  return function action(dispatch) {
    dispatch({ type: "SHOW_WARNING_HELP_END" });
  };
}
//CONVERSATION
function pushConversation(data) {
  return {
    type: "PUSH_CONVERSATION",
    data
  };
}
export function updateConversationCalendar(data) {
  return function action(dispatch) {
    dispatch({ type: "UPDATE_CONVERSATION_CALENDAR", data });
  };
}
function updateConversationError(data) {
  return { type: "PUSH_CONVERSATIONS_ERROR", data };
}
export function updateConversation(data) {
  return function action(dispatch) {
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));


    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/message",
      data: data
    });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = response.data;
          item.send = "from";
          item.enabled = true;
          messageResponse(dispatch, item);
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      err => {
        dispatch(
          updateConversationError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );


    //Respuesta
    setTimeout(() => {
      const rand = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      let data;
      //1 = MSG + Buttons (Valoración)
      //2 = MSG + Buttons (Contactar)
      //3 = MSG + Attach
      //4 = MSG + Select
      //5 = MSG + Multibutton
      //6 = MSG + Datepicker
      //8 = MULTIMSG
      switch (8) {
        case 1:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Soy una respuesta", "Te gustaría valorar la respuesta?"],
            buttons: [
              {
                title: "SI",
                value: "siValorar"
              },
              {
                title: "NO",
                value: "noValorar"
              }
            ]
          };
          break;
        case 2:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Contactar?"],
            buttons: [
              {
                title: "SI",
                value: "siContacto"
              },
              {
                title: "NO",
                value: "noContacto"
              }
            ]
          };
          break;
        case 3:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Debes adjuntar tu imagen"],
            attach: {
              types: [
                "image/jpeg",
                "image/gif",
                "image/png",
                "application/pdf",
                "application/word"
              ],
              maxSize: 300000
            }
          };
          break;
        case 4:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Por favor, selecciona una opción: "],
            selects: [
              {
                text: "Seleccione",
                value: "-1"
              },
              {
                text: "Option 1",
                value: "1"
              },
              {
                text: "Option 2",
                value: "2"
              },
              {
                text: "Option 3",
                value: "3"
              },
              {
                text: "Option 4",
                value: "4"
              },
              {
                text: "Option 5",
                value: "5"
              },
              {
                text: "Option 6",
                value: "6"
              }
            ]
          };
          break;
        case 5:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Hola, selecciona uno o varios botones:"],
            multibuttons: [
              { title: "hola", value: "1" },
              { title: "holanda", value: "2" },
              { title: "holiwis", value: "3" },
              { title: "holo", value: "4" },
              { title: "holawa", value: "5" }
            ]
          };
          break;
        case 6:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Hola, seleccione una fecha:"],
            datepicker: [
              { name: "inicial", value: "22/05/1991" },
              { name: "final", value: "22/05/1991" }
            ]
          };
          break;
        case 7:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Hola, seleccione una fecha:"],
            datepicker: [{ name: "", value: "" }, { name: "", value: "" }]
          };
          break;
        case 8:
          data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["lorem ipsum","lorem ipsum","lorem ipsum","lorem ipsum"]
          };
          break;
      }

      data.send = "from";
      data.enabled = true;

      messageResponse(dispatch, data);
    }, 500);
  };
}
function messageResponse(dispatch, data) {
  if (data.liftUp !== undefined) {
    //Si trae para levantar modales
    switch (data.liftUp) {
      case "valoracion":
        dispatch(setGeneral(data.general));
        dispatch({ type: "ENABLED_VALORACION" });
        dispatch(pushConversation(data));
        break;
      case "form":
        dispatch(setGeneral(data.general));
        dispatch({ type: "ENABLED_FORM" });
        dispatch(pushConversation(data));
      default:
        break;
    }
  } else {
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
  }
}
export function setHistory(data) {
  return function action(dispatch) {
    const lastConversation = data[data.length - 1],
      liftUp = lastConversation.liftUp;
    if (liftUp !== undefined) {
      switch (liftUp) {
        case "valoracion":
          dispatch({ type: "ENABLED_VALORACION" });
          break;
        case "form":
          dispatch({ type: "ENABLED_FORM" });
          break;
        default:
          break;
      }
    }
    dispatch(setGeneral(lastConversation.general));
    dispatch({ type: "SET_HISTORY", data });
  };
}
function deleteHistory() {
  return { type: "DELETE_HISTORY" };
}
export function setModal(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_MODAL", data });
  };
}
//BOTONES
export function updateConversationButton(data) {
  return function action(dispatch) {
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/message",
      data: data
    });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = response.data;
          item.send = "from";
          item.enabled = true;
          messageResponse(dispatch, item);
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      err => {
        dispatch(
          updateConversationError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );
  };
  switch (data.msg[0]) {
    case "siValorar":
      return function action(dispatch) {
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));
        setTimeout(() => {
          let data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: "node_3_1520961671401",
              intent: "remanente",
              auth: null,
              token: null,
              location: null
            },
            send: "from",
            enabled: true,
            liftUp: "valoracion"
          };
          messageResponse(dispatch, data);
        }, 500);
      };
    case "siContacto":
      return function action(dispatch) {
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));

        setTimeout(() => {
          let data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            send: "from",
            enabled: true,
            liftUp: "form",
            // form: {
            //   header: {
            //     icon: "fas fa-user-tie",
            //     textA: "Por favor ingrese sus datos y",
            //     textStrong:
            //       "uno de nuestros ejecutivos le responderá a la brevedad posible",
            //     textB: "o en horario hábil siguiente",
            //     closeMsg: "No"
            //   },
            //   bajada: "Campos obligatorios (*)",
            //   url: "https://www.google.cl",
            //   fields: [
            //     {
            //       legend: "Correo electrónico*",
            //       type: "email",
            //       name: "email",
            //       placeholder: "Ej. nombre@micorreo.cl",
            //       autocomplete: "off",
            //       validate: {
            //         types: ["required", "email"],
            //         error: "Debes ingresar un correo electrónico válido"
            //       }
            //     },
            //     {
            //       legend: "Password*",
            //       type: "password",
            //       name: "password",
            //       placeholder: "Ej. nombre@micorreo.cl",
            //       autocomplete: "off",
            //       validate: {
            //         types: ["required", "text"],
            //         rules: { min: 4, max: 10 },
            //         error: "Debes ingresar una password válida"
            //       }
            //     },
            //   ]
            // }

            form: {
              header: {
                icon: "fas fa-user-tie",
                textA: "Por favor ingrese sus datos y",
                textStrong:
                  "uno de nuestros ejecutivos le responderá a la brevedad posible",
                textB: "o en horario hábil siguiente",
                closeMsg: "No"
              },
              bajada: "Campos obligatorios (*)",
              url: "",
              fields: [
                {
                  legend: "Nombre*",
                  type: "text",
                  name: "nombre",
                  placeholder: "Ej. Juan",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "text"],
                    rules: { min: 3, max: 10 },
                    error: "Debes completar el nombre (mínimo 3, máximo 10)"
                  }
                },
                {
                  legend: "Rut*",
                  type: "text",
                  name: "rut",
                  placeholder: "Ej. 11111111-1",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "rut"],
                    error: "Debes ingresar un rut válido"
                  }
                },
                {
                  legend: "Teléfono",
                  type: "tel",
                  name: "telefono",
                  placeholder: "Ej. 912345678",
                  autocomplete: "off",
                  validate: {
                    types: ["tel"],
                    error: "Debes ingresar un teléfono válido"
                  }
                },
                {
                  legend: "Correo electrónico*",
                  type: "email",
                  name: "email",
                  placeholder: "Ej. nombre@micorreo.cl",
                  autocomplete: "off",
                  validate: {
                    types: ["required", "email"],
                    error: "Debes ingresar un correo electrónico válido"
                  }
                },
                {
                  legend: "Switch*",
                  type: "checkbox",
                  name: "switch",
                  validate: {
                    types: ["checkbox"],
                    error: "Debes seleccionar el checkbox"
                  }
                },
                {
                  legend: "Select prueba",
                  type: "select",
                  name: "opciones",
                  options: [
                    { text: "Seleccione", value: -1 },
                    { text: "Opcion #1", value: 1 },
                    { text: "Opcion #2", value: 2 },
                    { text: "Opcion #3", value: 3 }
                  ],
                  validate: {
                    types: ["required", "select"],
                    error: "Debes seleccionar una opción"
                  }
                },
                {
                  legend: "Adjuntar*",
                  type: "file",
                  name: "attach",
                  validate: {
                    types: ["required", "file"],
                    error: "Debes adjuntar",
                    rules: {
                      types: [
                        "image/jpeg",
                        "image/gif",
                        "image/png",
                        "application/pdf",
                        "application/word"
                      ],
                      maxSize: 300000,
                      maxQuantity: 3
                    }
                  }
                },
                {
                  legend: "Comentario",
                  type: "textarea",
                  name: "comentario",
                  placeholder: "Escriba aquí su comentario",
                  autocomplete: "off",
                  rows: 5,
                  validate: {
                    types: ["text"],
                    rules: { min: 3, max: 150 },
                    error: "Debes completar el nombre (mínimo 3, máximo 150)"
                  }
                }
              ]
            }
          };
          messageResponse(dispatch, data);
        }, 500);
      };
    default:
      return function action(dispatch) {
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));

        setTimeout(() => {
          let data = {
            general: {
              cid: "SOYELCID",
              origen: "Sitio Público",
              nodo_id: null,
              intent: null,
              auth: null,
              token: null,
              location: null
            },
            msg: ["Puedes preguntarme otra cosa..."],
            send: "from",
            enabled: true
          };
          messageResponse(dispatch, data);
        }, 500);
      };
  }
}
//INPUT
export function enabledInput() {
  return function action(dispatch) {
    dispatch({ type: "ENABLED_INPUT" });
  };
}
export function disabledInput() {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_INPUT" });
  };
}
export function attachFile(data) {
  return function action(dispatch) {
    dispatch(attachFileStart());
    setTimeout(() => {
      let item;
      item = {
        files: [
          "http://panikors.s3-website-us-east-1.amazonaws.com/wp-content/uploads/2015/01/Panteras-Negras.jpg",
          "http://www.google.com"
        ]
      };
      item.send = "from";
      item.enabled = true;
      item.general = data.general;
      dispatch(pushConversation(item));
      dispatch(attachFileEnd(item));
    }, 1500);
  };
}
export function deleteFileForm(data) {
  return function action(dispatch) {
    dispatch({ type: "DELETE_FILE", data });
  };
}
export function attachFileForm(data) {
  return function action(dispatch) {
    dispatch(attachFileStart());
    setTimeout(() => {
      let files = {
        name: "imagen",
        url:
          "http://panikors.s3-website-us-east-1.amazonaws.com/wp-content/uploads/2015/01/Panteras-Negras.jpg"
      };
      dispatch({ type: "SET_FILES", data: files });
      dispatch(attachFileEnd());
    }, 3000);
  };
}
function attachFileStart() {
  return {
    type: "GET_CONVERSATIONS_START"
  };
}
function attachFileEnd(data) {
  return {
    type: "GET_CONVERSATIONS_END"
  };
}
function attachFileError(error) {
  return {
    type: "GET_CONVERSATIONS_ERROR",
    error
  };
}
//VALORACIÓN
export function setStar(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_STARS_VALORACION", data });
    dispatch({ type: "SET_BUTTON_VALORACION", data: true });
  };
}
export function setOverStar(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_OVER_STAR_VALORACION", data });
  };
}
export function setCommentValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_COMMENT_VALORACION", data });
  };
}
export function setPudoResolverValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_PUDO_RESOLVER_VALORACION", data });
  };
}
export function setErrorValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_ERROR_VALORACION", data });
    setTimeout(() => {
      dispatch({ type: "SET_ERROR_VALORACION", data: false });
    }, 4000);
  };
}
export function sendValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "SEND_VALORACION_START" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/message",
      data: data
    });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = response.data;
          item.send = "from";
          item.enabled = true;
          messageResponse(dispatch, item);
          dispatch({type:"SEND_VALORACION_END"});
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      err => {
        dispatch(
          updateConversationError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );
  };
}
export function closeValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_VALORACION" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/message",
      data: data
    });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = response.data;
          item.send = "from";
          item.enabled = true;
          messageResponse(dispatch, item);
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      err => {
        dispatch(
          updateConversationError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );
  };
}
//FORM
export function closeForm(data) {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_FORM" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
    const request = axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: APIURL + "/message",
      data: data
    });
    return request.then(
      response => {
        if (response.status === 200) {
          let item = response.data;
          item.send = "from";
          item.enabled = true;
          messageResponse(dispatch, item);
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      err => {
        dispatch(
          updateConversationError(
            "Error de conexión con el servidor, intente nuevamente"
          )
        );
      }
    );
  };
}

export function sendForm(data, url) {
  return function action(dispatch) {
    dispatch({ type: "SEND_FORM_START" });

    // dispatch(setGeneral(data.general));
    // dispatch(pushConversation(data));

    //Respuesta
    setTimeout(() => {
      console.log("url ==> ", url);
      let data = {
        general: {
          cid: "SOYELCID",
          origen: "Sitio Público",
          nodo_id: null,
          intent: null,
          auth: null,
          token: null,
          location: null
        },
        msg: ["Se ha enviado el formulario"]
      };
      data.send = "from";
      data.enabled = true;
      messageResponse(dispatch, data);
      dispatch({ type: "SEND_FORM_END" });
      dispatch({ type: "DISABLED_FORM" });
    }, 500);
  };
}
