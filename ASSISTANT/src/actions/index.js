import axios, { post } from "axios";
import Geocode from "react-geocode";

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
          reject(new Error("Permission denied"));
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

    setTimeout(() => {
      let item;
      item = {
        avatar: "https://image.ibb.co/fpuiZJ/chat.png",
        colorHeader: "#564a86",
        colorBtn: "#333333",
        estado: "1",
        logo:
          "data:image/png;base64,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",
        status: 200,
        subtitulo: "SUBTITLE",
        titulo: "ASSISTANT TITLE",
        url: "https://example.com",
        userImg:
          "https://yt3.ggpht.com/a-/ACSszfH3hIxrtLXIrQhu3lLOvy-Hvidrl5p8nGWq2w=s900-mo-c-c0xffffffff-rj-k-no",
        settings: {
          keep_conversation: true,
          geolocalization: true,
          help: true,
          attach: false,
          emoji: false,
          voice: false
        }
      };
      dispatch(getCustomParamsEnd(item));
    }, 500);
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
    setTimeout(() => {
      let item;
      item = {
        msg: ["Hola soy el saludo"]
      };
      item.send = "from";
      dispatch(getSaludoEnd(item));
    }, 500);
  };
}
export function sendSaludo(data) {
  return function action(dispatch) {
    dispatch(pushConversation(data));
    dispatch({ type: "SEND_SALUDO" }); //No lo envía de nuevo
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
    dispatch({ type: "OPEN_LAUNCHER" });
    dispatch(deleteHistory());
  };
}
//AYUDA
export function getAyuda() {
  return function action(dispatch) {
    dispatch(getAyudaStart());
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
export function updateConversation(data) {
  return function action(dispatch) {
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));

    //Respuesta
    setTimeout(() => {
      const rand = Math.floor(Math.random() * (5 - 1 + 1) + 1);
      let data;
      switch (rand) {
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
            msg: ["No se que responder..."]
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
            multibuttons:[
              { text:"hola", value:"1" },
              { text:"holanda", value:"2" },
              { text:"holiwis", value:"3" },
              { text:"holo", value:"4" },
              { text:"holawa", value:"5" }
            ]
          };
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
  localStorage.removeItem("hc");
  return { type: "DELETE_HISTORY" };
}
export function setModal(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_MODAL", data });
  };
}
//BOTONES
export function updateConversationButton(data) {
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
                  legend: "Select prueba*",
                  type: "select",
                  name: "opciones",
                  options: [
                    { text: "Seleccione", value: -1 },
                    { text: "Opocion #1", value: 1 },
                    { text: "Opocion #2", value: 2 },
                    { text: "Opocion #3", value: 3 }
                  ],
                  validate: {
                    types: ["select"],
                    error: "Debes seleccionar una opción"
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
    // dispatch({ type: "SEND_VALORACION_START" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));

    setTimeout(() => {
      //Respuesta
      let data = {
        general: {
          cid: null,
          origen: "Sitio Público",
          nodo_id: null,
          intent: null,
          auth: null,
          token: null,
          location: null
        },
        msg: ["Soy una respuesta de la valoracion", "Pregúntame algo más..."]
      };
      data.send = "from";
      data.enabled = true;
      messageResponse(dispatch, data);
      dispatch({ type: "SEND_VALORACION_END" });
    }, 1000);
  };
}
export function closeValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_VALORACION" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));

    //Respuesta
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
        msg: ["Se ha cerrado la valoración"]
      };
      data.send = "from";
      data.enabled = true;
      messageResponse(dispatch, data);
    }, 500);
  };
}
//FORM
export function closeForm(data) {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_FORM" });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));

    //Respuesta
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
        msg: ["Se ha cerrado el formulario"]
      };
      data.send = "from";
      data.enabled = true;
      messageResponse(dispatch, data);
    }, 500);
  };
}
