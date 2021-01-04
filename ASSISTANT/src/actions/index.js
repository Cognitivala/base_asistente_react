import axios from 'axios';
import Geocode from 'react-geocode';
import { APIURL } from './constans';
import AES from 'crypto-js/aes';
import { KEY_ENCRYPT } from './key-encrypt';
import { isMobile } from 'react-device-detect';

// const USERLIKE_ENDPOINT = "/lynn_in";
const ASISTANT_INTERVAL_TIMER = 4000;

var interval;
var inputMessage = null;
var intervalFreshChat = null;

//GENERAL
function defaultGeneral() {
  return {
    type: 'DEFAULT_GENERAL',
  };
}

function setGeneral(data) {
  return {
    type: 'SET_GENERAL',
    data,
  };
}

function setNodoId(data) {
  return {
    type: 'SET_NODO_ID',
    data,
  };
}
export function getLocation() {
  return function action(dispatch) {
    const geolocation = navigator.geolocation;
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        () => {
          console.log('Permiso denegado');
          //reject(new Error("Permission denied"));
        }
      );
    });

    location
      .then((res) => {
        const keyGoogleMaps = 'AIzaSyDcsYlKbJi5SIYzYtZuaXEkTZXiXBLrym8',
          latitud = res.coords.latitude.toString(),
          longitud = res.coords.longitude.toString();
        Geocode.setApiKey(keyGoogleMaps);
        Geocode.enableDebug();
        Geocode.fromLatLng(latitud, longitud).then(
          (response) => {
            let data = getLocationObject(response.results);
            dispatch({ type: 'SET_LOCATION', data: data });
          },
          (error) => {
            console.log(error);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function getLocationObject(results) {
  let data = {};
  for (let i = 0; i < results.length; i++) {
    const ele = results[i];
    let types = ele.types;
    for (let j = 0; j < types.length; j++) {
      const type = types[j];
      if (type === 'administrative_area_level_3') {
        let address_components = ele.address_components;
        for (let k = 0; k < address_components.length; k++) {
          const address = address_components[k];
          if (address.types[0] === 'administrative_area_level_3') {
            data.comuna = address.long_name;
          } else if (address.types[0] === 'administrative_area_level_1') {
            data.region = address.long_name;
          } else if (address.types[0] === 'country') {
            data.pais = address.long_name;
          }
        }
        i = results.length;
        break;
      }
    }
  }
  return data;
}
export function setOrigen(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_ORIGEN', data });
  };
}
export function setIntegracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_INTEGRACION', data });
  };
}

export function setUrlParams(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_URL_PARAMS', data });
  };
}

export function setRegion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_REGION', data });
  };
}
//LAUNCHER
export function closeLauncher() {
  return function action(dispatch) {
    dispatch({ type: 'CLOSE_LAUNCHER' });
    dispatch({ type: 'TOGGLE_MINIMIZED', data: false });
  };
}
export function sendNotification(data) {
  return {
    type: 'SET_NOTIFICATION',
    data,
  };
}

//CUSTOM PARAMS
export function getCustomParams() {
  return function action(dispatch) {
    dispatch(getCustomParamsStart());

    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/customize_param',
      data: { id_cliente: '1' },
    });
    return request.then(
      (response) => {
        if (response.status === 200) {
          // response.data.valorarCierreAsistente = false;

          // console.log(response.data);
          //UPDATE COLORS
          setColors(response.data.color_header);
          dispatch(getCustomParamsEnd(response.data));
          let str_md5v = AES.encrypt(JSON.stringify(response.data), KEY_ENCRYPT).toString();
          localStorage.setItem('customParams', str_md5v);
          window.top.postMessage({ customParams: response.data }, '*');

          //Si tiene notificación
          if (response.data.settings.bubble === true) {
            dispatch(sendNotification(response.data.saludo_burbuja));
          }
        } else {
          dispatch(getCustomParamsError(response.statusText));
        }
      },
      (err) => {
        dispatch(getCustomParamsError('Error de conexión con el servidor, intente nuevamente'));
      }
    );
  };
}

function getCustomParamsError(error) {
  return {
    type: 'GET_CUSTOM_PARAMS_ERROR',
    error,
  };
}

function getCustomParamsStart() {
  return {
    type: 'GET_CUSTOM_PARAMS_START',
  };
}

function getCustomParamsEnd(data) {
  return {
    type: 'GET_CUSTOM_PARAMS_END',
    data,
  };
}
export function setCustomParams(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_PARAMS', data });
  };
}
export function updateCustomTitle(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_TITULO', data });
  };
}
export function updateCustomSubtitle(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_SUBTITULO', data });
  };
}
export function updateCustomColorHeader(data) {
  setColors(data);
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_COLOR_HEADER', data });
  };
}
export function updateCustomColorBtn(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_COLOR_BTN', data });
  };
}
export function updateCustomLogo(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_LOGO', data });
  };
}
export function updateCustomAvatar(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_CUSTOM_AVATAR', data });
  };
}
export function setColors(colorHeader) {
  document.documentElement.style.setProperty('--first', colorHeader);
  document.documentElement.style.setProperty('--laucher', colorHeader);
}
//SALUDO
export function getSaludo() {
  return function action(dispatch, getState) {
    dispatch(getSaludoStart());

    let origen = null;

    if (isMobile) {
      origen = 1;
    } else {
      origen = 1;
    }

    const queryString = window.location;
    const queryString2 = window.location.href;
    const queryString3 = window.location.href.toString();
    const queryString4 = window.location.href.toString().split(window.location.host)[1];

    // console.log("queryString:: ", queryString);
    // console.log("queryString2:: ", queryString2);
    // console.log("queryString3:: ", queryString3);
    // console.log("queryString4:: ", queryString4.length);

    const data = {
        general: {
          cid: null,
          id_cliente: '1',
          origen: origen,
          rut: getUrlParams(getState, 'rut'),
          user: getUrlParams(getState, 'user'),
          clave: getUrlParams(getState, 'clave'),
          ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
        },
        msg: null,
      },
      request = axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: APIURL + '/message',
        data: {
          ...data,
          rut: getUrlParams(getState, 'rut'),
          user: getUrlParams(getState, 'user'),
          clave: getUrlParams(getState, 'clave'),
          ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
        },
      });
    return request.then(
      (response) => {
        if (response.status === 200) {
          let item = {};
          item.msg = response.data.msg;
          let str_md5v = AES.encrypt(JSON.stringify(item), KEY_ENCRYPT).toString();
          localStorage.setItem('gr', str_md5v);
          dispatch(getSaludoEnd(item));
          //Si tiene notificación, la envía
          if (response.data.notification) {
            dispatch(sendNotification(response.data.notification));
          }
          //PRIMER MENSAJE
          const msg_inicial = response.data.msg_inicial;
          msg_inicial ? (item = msg_inicial) : (item.msg = ['¿Qué puedo hacer por ti?']);
          item.send = 'from';
          item.enabled = true;
          dispatch(pushConversation(item));
          dispatch(setNodoId(item.msg[item.msg.length - 1]));
        } else {
          dispatch(getSaludoError(response.statusText));
        }
      },
      (err) => {
        dispatch(getSaludoError('Error de conexión con el servidor, intente nuevamente'));
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
    type: 'GET_SALUDO_START',
  };
}
export function getSaludoEnd(data) {
  return {
    type: 'GET_SALUDO_END',
    data,
  };
}

function getSaludoError(error) {
  return {
    type: 'GET_SALUDO_ERROR',
    error,
  };
}
export function updateSaludo(data) {
  return function action(dispatch) {
    dispatch({ type: 'UPDATE_SALUDO', data: [data] });
    dispatch({ type: 'UPDATE_SALUDO_CONVERSATION', data: [data] });
  };
}
//ASSISTANT
export function openAssistant() {
  return function action(dispatch) {
    dispatch({ type: 'OPEN_ASSISTANT' });
  };
}

var asistantInterval = null;

export function closeAssistant() {
  return async function action(dispatch, getState) {
    clearInterval(interval);
    localStorage.removeItem('deriva_userlike');
    await getUserlikeEnd();
    localStorage.removeItem('email_user');
    dispatch(defaultGeneral());
    dispatch({ type: 'CLOSE_ASSISTANT' });
    dispatch({ type: 'SET_NOTIFICATION', data: null });
    dispatch({ type: 'ENABLED_INPUT' });
    dispatch({ type: 'ENABLED_HELP' });
    dispatch({ type: 'TOGGLE_MINIMIZED', data: false });
    dispatch({ type: 'OPEN_LAUNCHER' });

    dispatch({ type: 'SET_INTEGRACION', data: {} });
    dispatch(deleteHistory());
  };
}

export function toggleMinimizedAssistant(data) {
  return function action(dispatch) {
    dispatch({ type: 'TOGGLE_MINIMIZED', data });
    dispatch({ type: 'OPEN_LAUNCHER' });
  };
}
export function defaultAssistant() {
  return function action(dispatch) {
    dispatch({ type: 'TOGGLE_MINIMIZED', data: false });
  };
}
//AYUDA
export function getAyuda() {
  return function action(dispatch) {
    dispatch(getAyudaStart());
    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/preguntas_ejemplo',
    });
    return request.then(
      (response) => {
        // console.log('RESPONSE MENSAJE 2::');
        if (response.data.estado.codigoEstado === 200) {
          dispatch(getAyudaEnd(response.data.respuesta));
        } else {
          dispatch(getAyudaError(response.data.respuesta));
        }
      },
      (err) => {
        dispatch(getAyudaError('Error de conexión con el servidor, intente nuevamente'));
      }
    );
  };
}

function getAyudaStart() {
  return {
    type: 'GET_AYUDA_START',
  };
}

function getAyudaEnd(data) {
  return {
    type: 'GET_AYUDA_END',
    data,
  };
}

function getAyudaError(error) {
  return {
    type: 'GET_AYUDA_ERROR',
    error,
  };
}
export function openHelp() {
  return function action(dispatch) {
    dispatch({ type: 'OPEN_HELP' });
  };
}
export function closeHelp() {
  return function action(dispatch) {
    dispatch({ type: 'CLOSE_HELP' });
  };
}
export function enabledHelp() {
  return function action(dispatch) {
    dispatch({ type: 'ENABLED_HELP' });
  };
}
export function disabledHelp() {
  return function action(dispatch) {
    dispatch({ type: 'DISABLED_HELP' });
  };
}
export function showWarningHelp() {
  return function action(dispatch) {
    dispatch({ type: 'SHOW_WARNING_HELP' });
  };
}
export function hideWarningHelp() {
  return function action(dispatch) {
    dispatch({ type: 'SHOW_WARNING_HELP_END' });
  };
}
//CONVERSATION
function pushConversation(data) {
  return {
    type: 'PUSH_CONVERSATION',
    data,
  };
}
export function updateConversationCalendar(data) {
  return function action(dispatch) {
    dispatch({ type: 'UPDATE_CONVERSATION_CALENDAR', data });
  };
}

function updateConversationError(data) {
  let conv = {};
  conv.msg = [data];
  conv.enabled = true;
  conv.from = 'from';
  if (data.exitoFormulario) {
    conv.exito_formulario = data.exitoFormulario;
  }
  return { type: 'PUSH_CONVERSATIONS_ERROR', data: conv };
}

export function updateConversation(data) {
  // console.log('updateConversation:: 1 ', data);

  let inputMessage = data.msg[0];

  return function action(dispatch, getState) {
    // console.log('updateConversation DATA.GENERAL:: ', data.general);

    // SE AGREGA VARIABLE email_user
    const queryString = window.location.href.toString().split(window.location.host)[1];

    // const useUserlike = getState().assistantStates.getIn(["useUserlike"]);
    // const url = useUserlike ? USERLIKE_ENDPOINT : "/message";
    // let data = {};

    // if (useUserlike) {
    //   data = {
    //     ...conversationData,
    //     general: {
    //       ...getState().assistantStates.getIn(["userlikeData"]),
    //       token: getState().generalStates.getIn(["token"]),
    //     },
    //   };
    // } else

    if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
      data.general.integracion = {
        ...data.general.integracion,
        email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
      };

      data.general.url_params = {
        ...data.general.url_params,
        email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
      };
    }

    data.general = {
      ...data.general,
      id_cliente: '1',
      origen: 1,
      token: null,
      // token: getState().assistantStates.getIn(["userlikeData", "token"]),
    };

    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));

    // console.log('updateConversation DATA:: ', data);

    if (localStorage.getItem('deriva_userlike') === 'true') {
      // console.log("ENVIAR DATA A USERLIKE!!");
      // console.log("DATA ENVIAR DATA A USERLIKE!!", data);
      // console.log("inputMessage ENVIAR DATA A USERLIKE!!", inputMessage);
      getUserlikeIn(dispatch, data, inputMessage);
    } else {
      const request = axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: APIURL + '/message',
        data: {
          ...data,
          rut: getUrlParams(getState, 'rut'),
          user: getUrlParams(getState, 'user'),
          clave: getUrlParams(getState, 'clave'),
          ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
          // emailUser,
          // integracion: {
          //     email_user: data.email_user
          // }
          // general: {...data.general.integracion, email_user: data.email_user }
          // email_user: data.email_user
        },
      });
      return request
        .then((response) => {
          // console.log('message updateConversation:: ', response.data);
          // console.log('message updateConversation MSG:: ', response.data.msg);
          if (response.status === 200 && response.data.msg !== undefined && response.data.msg !== null && response.data.estado.codigoEstado === 200) {
            let item = response.data;
            item.send = 'from';
            item.enabled = true;
            // item.email_user = response.data.email_user

            // console.log("response.data.agent::: ", response.data.agent);
            if (response.data.agent === true) {
              item.msg = [`${inputMessage}`];
              sessionStorage.setItem('cid', response.data.general.cid);
            } else if (localStorage.getItem('email_user') !== null) {
              const queryString = window.location.href.toString().split(window.location.host)[1];
              if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
                const email_user = localStorage.getItem('email_user');
                item.general.integracion = {
                  ...data.general.integracion,
                  email_user: email_user,
                };
              }
            }
            // console.log('updateConversation Item:: ', item);

            // dispatch(setNodoId(item.msg[item.msg.length - 1]));
            messageResponse(dispatch, item);
          } else {
            dispatch(updateConversationError(response.statusText));
          }
        })
        .catch((err) => {
          dispatch(updateConversationError(err.response.data.msg));
        });
    }
  };
}

async function messageResponse(dispatch, data) {
  // console.log('messageResponse:: 1 ', data);
  data.general = {
    ...data.general,
    id_cliente: '1',
  };

  if (data.liftUp !== undefined) {
    //Si trae para levantar modales
    switch (data.liftUp) {
      case 'valoracion':
        if (data.general !== undefined) {
          dispatch(setGeneral(data.general));
          if (data.general.integracion !== undefined) dispatch(setIntegracion(data.general.integracion));
        }
        dispatch({ type: 'ENABLED_VALORACION' });
        disabledHelp();
        disabledInput();
        dispatch(pushConversation(data));
        break;
      case 'form':
        if (data.general !== undefined) {
          dispatch(setGeneral(data.general));
          if (data.general.integracion !== undefined) dispatch(setIntegracion(data.general.integracion));
        }
        dispatch({ type: 'ENABLED_FORM' });
        dispatch(pushConversation(data));
        break;
      default:
        break;
    }
  } else if (data.end_conversation === true) {
    dispatch(pushConversation(data));
    dispatch({ type: 'DISABLED_INPUT' });
  } else if (data.freshchat) {
    await showMessageResponse(dispatch, data);
  }
  // else if (data.estado.codigoEstado === 303) {
  //   dispatch(addLynnData(data.general));
  //   // SE COMENTA PARA REVISAR INIT DE LYNN
  //   dispatch(userlikeInit(data, general));
  // }
  else if (data.deriva_userlike === true) {
    // console.log("inputMessage:: ", inputMessage);
    localStorage.setItem('deriva_userlike', true);
    await getUserlikeIn(dispatch, data, inputMessage);
  } else {
    clearInterval(intervalFreshChat);
    // console.log('data.general ', data)
    if (data.general !== undefined) {
      dispatch(setGeneral(data.general));
      if (data.general.region !== undefined) {
        dispatch(setRegion(data.general.region));
      }
      if (data.general.integracion !== undefined) {
        dispatch(setIntegracion(data.general.integracion));
      }
    }
    dispatch(pushConversation(data));
  }
}

export function setHistory(data) {
  return function action(dispatch) {
    const lastConversation = data[data.length - 1],
      liftUp = lastConversation.liftUp;
    if (liftUp !== undefined) {
      switch (liftUp) {
        case 'valoracion':
          dispatch({ type: 'ENABLED_VALORACION' });
          break;
        case 'form':
          dispatch({ type: 'ENABLED_FORM' });
          break;
        default:
          break;
      }
    }
    dispatch(setGeneral(lastConversation.general));
    dispatch({ type: 'SET_HISTORY', data });
  };
}

function deleteHistory() {
  return { type: 'DELETE_HISTORY' };
}
export function setModal(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_MODAL', data });
  };
}
//BOTONES
export function updateConversationButton(data) {
  // console.log("updateConversationButton:: ", data);

  switch (data.msg[0]) {
    case 'siValorar':
      return function action(dispatch) {
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));
        setTimeout(() => {
          let _data = {
            general: data.general,
            send: 'from',
            enabled: true,
            liftUp: 'valoracion',
            withStars: false,
          };
          messageResponse(dispatch, _data);
        }, 500);
      };
    case 'noValorar':
      return function action(dispatch) {
        dispatch({ type: 'DISABLED_VALORACION' });
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));
        setTimeout(() => {
          let _data = {
            general: data.general,
            send: 'from',
            enabled: true,
            msg: ['Lamentamos que no quieras.', 'Recuerda que si vuelves a necesitar ayuda, estoy acá las 24 horas del día.'],
          };
          messageResponse(dispatch, _data);
        }, 500);
      };
    case 'siContacto':
      return function action(dispatch) {
        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));
      };
    default:
      return function action(dispatch, getState) {
        // SE AGREGA VARIABLE email_user
        const queryString = window.location.href.toString().split(window.location.host)[1];
        if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
          data.general.integracion = {
            ...data.general.integracion,
            email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
          };

          data.general.url_params = {
            ...data.general.url_params,
            email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
          };
        }

        dispatch(setGeneral(data.general));
        dispatch(pushConversation(data));

        const request = axios({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          url: APIURL + '/message',
          data: {
            ...data,
            rut: getUrlParams(getState, 'rut'),
            user: getUrlParams(getState, 'user'),
            clave: getUrlParams(getState, 'clave'),
            ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
          },
        });

        return request.then(
          (response) => {
            // console.log("RESPONSE MENSAJE 3::");
            if (response.status === 200) {
              let item = response.data;
              item.send = 'from';
              item.enabled = true;
              if (localStorage.getItem('email_user') !== null) {
                const queryString = window.location.href.toString().split(window.location.host)[1];
                if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
                  const email_user = localStorage.getItem('email_user');
                  item.general.integracion = {
                    ...data.general.integracion,
                    email_user: email_user,
                  };
                }
              }
              dispatch(setNodoId(item.msg[item.msg.length - 1]));
              messageResponse(dispatch, item);
            } else {
              dispatch(updateConversationError(response.statusText));
            }
          },
          (err) => {
            dispatch(updateConversationError(err.response.data.msg));
          }
        );
      };
  }
}
//INPUT
export function enabledInput() {
  return function action(dispatch) {
    dispatch({ type: 'ENABLED_INPUT' });
  };
}
export function disabledInput() {
  return function action(dispatch) {
    dispatch({ type: 'DISABLED_INPUT' });
  };
}
export function attachFile(data) {
  return function action(dispatch) {
    dispatch(attachFileStart());
    setTimeout(() => {
      let item;
      item = {
        files: ['http://panikors.s3-website-us-east-1.amazonaws.com/wp-content/uploads/2015/01/Panteras-Negras.jpg', 'http://www.google.com'],
      };
      item.send = 'from';
      item.enabled = true;
      item.general = data.general;
      dispatch(pushConversation(item));
      dispatch(attachFileEnd(item));
    }, 1500);
  };
}
export function deleteFileForm(data) {
  return function action(dispatch) {
    dispatch({ type: 'DELETE_FILE', data });
  };
}
export function attachFileForm(data) {
  return function action(dispatch) {
    dispatch(attachFileStart());
    setTimeout(() => {
      let files = {
        name: 'imagen',
        url: 'http://panikors.s3-website-us-east-1.amazonaws.com/wp-content/uploads/2015/01/Panteras-Negras.jpg',
      };
      dispatch({ type: 'SET_FILES', data: files });
      dispatch(attachFileEnd());
    }, 3000);
  };
}

function attachFileStart() {
  return {
    type: 'GET_CONVERSATIONS_START',
  };
}
// function attachFileError(error) {
//   return {
//     type: "GET_CONVERSATIONS_ERROR",
//     error
//   };
// }
function attachFileEnd(data) {
  return {
    type: 'GET_CONVERSATIONS_END',
  };
}
export function openEmoji() {
  return function action(dispatch) {
    dispatch({ type: 'OPEN_EMOJI' });
  };
}
export function closeEmoji() {
  return function action(dispatch) {
    dispatch({ type: 'CLOSE_EMOJI' });
  };
}
export function openVoice() {
  return function action(dispatch) {
    dispatch({ type: 'OPEN_VOICE' });
  };
}
export function closeVoice() {
  return function action(dispatch) {
    dispatch({ type: 'CLOSE_VOICE' });
  };
}
//VALORACIÓN
export function setStar(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_STARS_VALORACION', data });
    dispatch({ type: 'SET_BUTTON_VALORACION', data: true });
  };
}
export function setOverStar(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_OVER_STAR_VALORACION', data });
  };
}
export function setCommentValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_COMMENT_VALORACION', data });
  };
}
export function setServicioValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_SERVICIO_VALORACION', data });
  };
}
export function setPudoResolverValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_PUDO_RESOLVER_VALORACION', data });
  };
}
export function setErrorValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'SET_ERROR_VALORACION', data });
    setTimeout(() => {
      dispatch({ type: 'SET_ERROR_VALORACION', data: false });
    }, 4000);
  };
}
export function sendValoracion(data, general) {
  return function action(dispatch, getState) {
    dispatch({ type: 'GET_CONVERSATIONS_START' });

    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/valorar',
      data: data,
    });
    return request.then(
      (response) => {
        if (response.status === 200 && response.data.estado.codigoEstado === 200) {
          let item = {};
          item.send = 'from';
          item.enabled = true;
          item.general = general;
          item.msg = ['exito_formulario'];

          const getValorarCierreAsistente = getState().customParamsStates.getIn(['customParams', 'settings', 'valorarCierreAsistente']);
          if (getValorarCierreAsistente) {
            dispatch({ type: 'GET_CONVERSATIONS_END' });
            dispatch(closeAssistant());
          } else {
            dispatch(updateConversation(item));
            dispatch({ type: 'GET_CONVERSATIONS_END' });

            // console.log("ITEM GENERAL:: ", item.general);
          }
        } else {
          let msg = ['error_formulario'];
          dispatch(updateConversationError(msg));
        }
      },
      (err) => {
        dispatch(updateConversationError(err.response.data.msg));
        dispatch({ type: 'GET_CONVERSATIONS_END' });
      }
    );
  };
}

export function closeValoracion(data) {
  return function action(dispatch) {
    dispatch({ type: 'DISABLED_VALORACION' });
    updateConversationButton(data);
  };
}

//LIKE
export function sendLike(data, general) {
  // console.log("sendLike:: ", data);
  // console.log("sendLike:: ", general);

  data.id_data_canal = 123;
  data.input = 'www';
  data.output = 'www';
  data.id_canal = 1;
  data.valoracion = null;
  data.comentario = null;
  if (data.like === '0') {
    data.resolvio = 0;
  } else {
    data.resolvio = 1;
  }

  if (data.like === '0') {
    data.like = 0;
  } else {
    data.like = 1;
  }
  delete data.pudo_resolver;

  return function action(dispatch) {
    dispatch({ type: 'GET_CONVERSATIONS_START' });
    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/valorar',
      data: data,
    });
    return request.then(
      (response) => {
        // console.log("sendLike response:: ", response);

        if (response.status === 200 && response.data.estado.codigoEstado === 200) {
          let item = {};
          item.msg = [response.data.respuesta];
          item.send = 'from';
          item.enabled = true;
          item.general = general;
          item.msg = ['exito_formulario'];

          // console.log("sendLike:: ", item.general);
          dispatch(updateConversation(item));
          // dispatch({ type: "GET_CONVERSATIONS_END" });

          // messageResponse(dispatch, item);
        } else {
          let msg = ['error_formulario'];
          dispatch(updateConversationError(response.statusText));
        }
        dispatch({ type: 'GET_CONVERSATIONS_END' });
      },
      (err) => {
        dispatch(updateConversationError('Disculpa, se ha producido un error al valorar. Puedes continuar con la conversación.'));
        dispatch({ type: 'GET_CONVERSATIONS_END' });
      }
    );
  };
}
//FORM
export function closeForm(data) {
  return function action(dispatch, getState) {
    // SE AGREGA VARIABLE email_user
    const queryString = window.location.href.toString().split(window.location.host)[1];
    if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
      data.general.integracion = {
        ...data.general.integracion,
        email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
      };

      data.general.url_params = {
        ...data.general.url_params,
        email_user: localStorage.getItem('email_user') !== null ? localStorage.getItem('email_user') : null,
      };
    }

    dispatch({ type: 'DISABLED_FORM' });
    dispatch(setGeneral(data.general));
    dispatch(pushConversation(data));
    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/message',
      data: {
        ...data,
        rut: getUrlParams(getState, 'rut'),
        user: getUrlParams(getState, 'user'),
        clave: getUrlParams(getState, 'clave'),
        ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
      },
    });
    return request.then(
      (response) => {
        if (response.status === 200 && response.data.estado.codigoEstado === 200) {
          let item = response.data;
          item.send = 'from';
          item.enabled = true;
          if (localStorage.getItem('email_user') !== null) {
            const queryString = window.location.href.toString().split(window.location.host)[1];
            if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
              const email_user = localStorage.getItem('email_user');
              item.general.integracion = {
                ...data.general.integracion,
                email_user: email_user,
              };
            }
          }
          dispatch(setNodoId(item.msg[item.msg.length - 1]));
          messageResponse(dispatch, item);
        } else {
          dispatch(updateConversationError(response.statusText));
        }
      },
      (err) => {
        dispatch(updateConversationError(err.response.data.msg));
      }
    );
  };
}
export function sendForm(data, url, general) {
  data.general = general;
  return function action(dispatch, getState) {
    dispatch({ type: 'SEND_FORM_START' });
    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: url,
      data: data,
    });
    return request.then(
      (response) => {
        if (response.status === 200 && response.data.estado.codigoEstado === 200) {
          let item = {};
          //item.msg = [response.data.respuesta];
          item.msg = ['exito_formulario'];
          item.send = 'to';
          item.enabled = false;
          item.general = general;
          //updateConversation(item);
          // messageResponse(dispatch, item);
          dispatch({ type: 'DISABLED_FORM' });
          const request = axios({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            url: APIURL + '/message',
            data: {
              ...item,
              rut: getUrlParams(getState, 'rut'),
              user: getUrlParams(getState, 'user'),
              clave: getUrlParams(getState, 'clave'),
              ejecutivo_amsa: getUrlParams(getState, 'ejecutivo_amsa'),
            },
          });
          return request
            .then((response) => {
              // console.log('RESPONSE MENSAJE 5::');
              if (response.status === 200 && response.data.estado.codigoEstado === 200) {
                dispatch({ type: 'SEND_FORM_END' });
                let item = response.data;
                item.send = 'from';
                item.enabled = true;
                if (localStorage.getItem('email_user') !== null) {
                  const queryString = window.location.href.toString().split(window.location.host)[1];
                  if (queryString === '/asistente/?ejecutivo_amsa=true' || queryString.length > 11) {
                    const email_user = localStorage.getItem('email_user');
                    item.general.integracion = {
                      ...data.general.integracion,
                      email_user: email_user,
                    };
                  }
                }
                dispatch(setNodoId(item.msg[item.msg.length - 1]));
                messageResponse(dispatch, item);
              } else if (response.data !== undefined) {
                dispatch(updateConversationError(response.data.msg));
              } else {
                dispatch({ type: 'SEND_FORM_END' });
                dispatch(updateConversationError(response.statusText));
              }
            })
            .catch((err) => {
              dispatch({ type: 'SEND_FORM_END' });
              dispatch(updateConversationError(err.response.data.msg));
            });
        } else {
          dispatch(updateConversationError((response.statusText = 'error_formulario')));
          dispatch({ type: 'DISABLED_FORM' });
        }
      },
      (err) => {
        dispatch({ type: 'DISABLED_FORM' });
        dispatch(updateConversationError(err.response === undefined ? err.message : err.response.data.msg));
      }
    );

    // dispatch(setGeneral(data.general));
    // dispatch(pushConversation(data));

    //Respuesta
    // setTimeout(() => {
    //   console.log("url ==> ", url);
    //   let data = {
    //     general: {
    //       cid: "SOYELCID",
    //       origen: "Sitio Público",
    //       nodo_id: null,
    //       intent: null,
    //       auth: null,
    //       token: null,
    //       location: null
    //     },
    //     msg: ["Se ha enviado el formulario"]
    //   };
    //   data.send = "from";
    //   data.enabled = true;
    //   messageResponse(dispatch, data);
    //   dispatch({ type: "SEND_FORM_END" });
    //   dispatch({ type: "DISABLED_FORM" });
    // }, 500);
  };
}
//RESPONSIVE
export function responsive(data) {
  return function action(dispatch) {
    dispatch({ type: 'RESPONSIVE', data });
  };
}
//VOICE
export function enabledVoice() {
  return function action(dispatch) {
    dispatch({ type: 'ENABLED_VOICE' });
  };
}
export function disabledVoice() {
  return function action(dispatch) {
    dispatch({ type: 'DISABLED_VOICE' });
  };
}

// getUrlParams
export function getUrlParams(getState, urlParam) {
  const paramValue = getState().generalStates.getIn(['url_params', urlParam]);
  if (paramValue === 'null') return null;
  return paramValue;
}

// INTEGRACIÓN LYNN

export function addLynnData(data) {
  return function action(dispatch) {
    dispatch({ type: 'USERLIKE_DATA', data: data });
  };
}

export function startLynn() {
  return function action(dispatch) {
    dispatch({ type: 'USE_USERLIKE', data: true });
  };
}

export function closeLynn() {
  return function action(dispatch) {
    dispatch({ type: 'USE_USERLIKE', data: false });
  };
}

function userlikeInit(data, general) {
  const newData = {
    ...data,
    msg: ['.... Iniciando Comunicación con Ejecutivo ....'],
  };
  return function action(dispatch) {
    const request = axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: APIURL + '/lynn_in',
      data: newData,
    });
    return request.then((response) => {
      // console.log('RESPONSE LYNN', response);
      if (response.status === 200) {
        dispatch(startLynn());
        dispatch(pushConversation(data));
        // Intervalo para buscar posibles respuestas de Lynn
        dispatch(userlikeOutInterval(data, general));
      }
    });
  };
}

function userlikeEnd(dispatch, getState) {
  // if() {

  // }
  const data = {
    cid: getState().assistantStates.getIn(['userlikeData', 'cid']),
    sid: getState().assistantStates.getIn(['userlikeData', 'sid']),
    token: getState().assistantStates.getIn(['userlikeData', 'token']),
  };

  const request = axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: APIURL + '/lynn_end',
    data: data,
  });
  return request.then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'DISABLED_INPUT' });
      dispatch(closeLynn());
      // clearInterval(asistantInterval);
      return;
    }
  });
}

function userlikeOutInterval(data) {
  return function action(dispatch, getState) {
    // MÉTODO PARA ESCUCHAR LOS POSIBLES MENSAJES DEL EJECUTIVO LYNN
    asistantInterval = setInterval(function() {
      const request = axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: APIURL + '/lynn_out',
        data: data,
      });
      return request.then((response) => {
        // console.log("LYNN! OUT", response)
        let item = {};
        item.send = 'from';
        item.enabled = true;
        item.general = getState().assistantStates.getIn(['userlikeData']);
        if (response.data.textos[0] === 'Inicio') {
          delete item.msg;
        } else {
          item.msg = response.data.textos;
        }

        dispatch(pushConversation(item));

        // SE MANDA POST A LYNEND
        if (response.data.eventos[0] === 'conversationEnd') {
          // console.log("LYNEND", data);
          const request = axios({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            url: APIURL + '/lynn_end',
            data: data,
          });
          return request.then((response) => {
            if (response.status === 200) {
              dispatch({ type: 'DISABLED_INPUT' });
              dispatch(closeLynn());
              clearInterval(asistantInterval);
              return;
            }
          });
        }
      });
    }, ASISTANT_INTERVAL_TIMER);
  };
}

// FIN INTEGRACIÓN LYNN

//USERLIKE IN
export const getUserlikeIn = (dispatch, data, inputMessage) => {
  // console.log("getUserlikeIn DATA:: ", data);
  // console.log("getUserlikeIn MSG:: ", data.msg);
  // console.log("getUserlikeIn inputMessage:: ", inputMessage);
  // console.log("DATA GENERAL getUserlikeIn", data);

  const { general, msg, send, enabled } = data;
  let newData = { general, msg, send, enabled };
  console.log(newData);

  const urlApi = APIURL + '/live_message_in';
  const token = sessionStorage.getItem('token');

  axios
    .post(urlApi, newData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      // console.log("response.data getUserlikeIn:: ", response);
      const dataResponse = response.data;

      // if (response.status === 200 && dataResponse.estado.codigoEstado === 200) {
      // console.log("item in", dataResponse);

      if (dataResponse.end_conversation === true) {
        clearInterval(interval);
        let item = dataResponse;
        item.enabled = false;
        item.msg = ['userlike_off'];

        localStorage.removeItem('deriva_userlike');
        dispatch(updateConversation(item));
      }
      // else {
      //   let item = response.data;
      //   item.send = "from";
      //   item.enabled = true;
      //   dispatch(updateConversation(item));
      // }
      else {
        let item = dataResponse;
        item.enabled = false;
        item.msg = [''];
        // dispatch(updateConversation(item));
        getUserlikeOut(dispatch, data);
        // clearInterval(interval);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem('deriva_userlike');
    });
};

//USERLIKE OUT
export function getUserlikeOut(dispatch, data) {
  // clearInterval(asistantInterval);
  if (interval) {
    clearInterval(interval);
  }

  var ASISTANT_INTERVAL_TIMER = 5000;

  interval = setInterval(function() {
    /* console.log(data); */
    const urlApi = APIURL + '/live_message_out';
    const { general, msg, send, enabled } = data;
    let newData = { general, msg, send, enabled };
    const token = sessionStorage.getItem('token');

    axios
      .post(urlApi, newData, {
        headers: {
          // 'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(async (response) => {
        // console.log("", response.data);
        const dataResponse = response.data;

        if (dataResponse.estado.codigoEstado === 200) {
          // dispatch(updateConversation(response.data.msg));

          if (dataResponse.end_conversation) {
            // getUserlikeEnd();
            clearInterval(interval);
            let item = dataResponse;
            item.enabled = false;
            item.msg = ['userlike_end'];
            localStorage.removeItem('deriva_userlike');
            dispatch(updateConversation(item));
          } else {
            let item = response.data;
            item.send = 'from';
            item.enabled = true;
            // dispatch(updateConversation(item));
            // await dispatch(messageResponse(dispatch, item));
            await dispatch(pushConversation(item));
          }
        }
        // else {
        // }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('deriva_userlike');
      });
  }, ASISTANT_INTERVAL_TIMER);
}

//USERLIKE END
export const getUserlikeEnd = () => {
  const urlApi = APIURL + '/live_message_end';
  let data = { cid: JSON.stringify(sessionStorage.getItem('cid')) };
  const token = sessionStorage.getItem('token');

  axios
    .post(urlApi, data, {
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log("getUserlikeEnd:: ", response.data);
      localStorage.removeItem('deriva_userlike');
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem('deriva_userlike');
    });
};

// derivar_userlike

//Funcion para determinar termino de converzacion
export const showMessageResponse = (dispatch, data) => {
  if (intervalFreshChat) {
    clearInterval(intervalFreshChat);
  }

  intervalFreshChat = setInterval(function() {
    const urlApi = APIURL + '/freshchat_endpoint';
    const { general, msg } = data;
    general.origen = 1;

    const newData = { general, msg };
    const configHeaders = {
      headers: { 'Content-Type': 'application/json' },
    };

    axios
      .post(urlApi, newData, configHeaders)
      .then(async (response) => {
        const dataResponse = response.data;

        if (dataResponse.estado.codigoEstado === 200) {
          let item = data;
          item.msg = dataResponse.msg;
          // console.log('ITEM MENSAJE:: ', item);
          dispatch(pushConversation(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 4000);
};
