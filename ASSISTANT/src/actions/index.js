import axios, { post } from "axios";

//CID
export function setCid(data) {
  return function action(dispatch) {
    dispatch({ type: "SET_CID", data });
  };
}

//LAUNCHER
export function closeLauncher() {
  return function action(dispatch) {
    dispatch({ type: "CLOSE_LAUNCHER" });
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
        //colorBubble: "#e7e7e7",
        colorHeader: "#d64b36",
        colorBtn: "#333333",
        estado: "1",
        logo:
          "data:image/png;base64,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",
        status: 200,
        subtitulo: "SUBTITLE",
        titulo: "ASSISTANT TITLE",
        url: "https://example.com",
        settings: {
          keep_conversation: false,
          geolocalization: false,
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
    dispatch({ type: "PUSH_CONVERSATION", data });
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
export function openAssistant(data) {
  return function action(dispatch) {
    dispatch({ type: "OPEN_ASSISTANT" });
  };
}

export function closeAssistant() {
  return function action(dispatch) {
    dispatch({ type: "CLOSE_ASSISTANT" });
    dispatch({ type: "OPEN_LAUNCHER" });
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
    dispatch({ type: "ENABLED_INPUT" });
  };
}
export function disabledHelp() {
  return function action(dispatch) {
    dispatch({ type: "DISABLED_HELP" });
    dispatch({ type: "DISABLED_INPUT" });
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
export function updateConversation(data) {
  return function action(dispatch) {
    dispatch({ type: "PUSH_CONVERSATION", data });
    //Respuesta
    setTimeout(() => {
      let data = {
        cid: "",
        msg: ["Soy una respuesta"],
        buttons: [
          {
            title: "boton #1",
            value: 0
          },
          {
            title: "boton #2",
            value: 1
          }
        ]
      };
      data.send = "from";
      messageResponse(dispatch,data);
    }, 500);
  };
}

//Verifica los tipos de cosas que puede traer el response
function messageResponse(dispatch,data){
  if(data.liftUp!==undefined){//Si trae para levantar modales
    switch (data.liftUp) {
      case "valoracion":
        dispatch({ type:"ENABLED_VALORACION" });
        break;
      default:
        break;
    }
  }else{
    dispatch({ type: "PUSH_CONVERSATION", data });
  }

}

//BOTONES
export function updateConversationButton(data) {
  return function action(dispatch) {
    setTimeout(() => {
      let data = {
        cid: "",
        liftUp: "valoracion", 
        intent: "remanente", 
        nodo_id: "node_3_1520961671401"
      };
      data.send = "from";
      messageResponse(dispatch,data);
    }, 500);
  };
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


// //LOGIN
// export function recoverPassChange(username, password){
//   return function action(dispatch){
//     dispatch(fetchLoginStart());

//     const request = axios({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//       url: apiUrl + 'auth/ACTUALIZAR_CONTRASENA_USUARIO',
//       data: {
//         username,
//         password
//       }
//     });

//     return request.then(
//       (response) => {
//         if(response.data.estado.codigo === 200){
//           dispatch(loginUser({
//             dispositivo: 'Desktop',
//             geolocalizacion: '',
//             ip: '',
//             navegador: '',
//             password,
//             username
//           }));
//         }else{
//           dispatch(fetchLoginError(response.data.estado.glosa));
//         }
//       },
//       (err) => {
//         dispatch(fetchLoginError('Error de conexión con el servidor, intente nuevamente'))
//       }
//     );
//   }
// }

// function fetchLoginStart(){
//   return {
//     type: 'FETCH_LOGIN_START'
//   }
// }

// function fetchLoginEnd(userData, code){
//   return {
//     type: 'FETCH_LOGIN_END',
//     userData,
//     code
//   }
// }

// function fetchLoginError(error){
//   return {
//     type: 'FETCH_LOGIN_ERROR',
//     error,
//     messageStatus: 'error'
//   }
// }
