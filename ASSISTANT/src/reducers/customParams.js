import * as Immutable from "immutable";

export function customParamsStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    customParams: {
      avatar: "",
      //colorBubble: "",
      colorHeader: "",
      colorBtn: "",
      estado: "",
      logo: "",
      status: 0,
      subtitulo: "",
      titulo: "",
      url: "",
      settings: {
        keep_conversation: false,
        geolocalization: false,
        help: false,
        attach: false,
        emoji: false,
        voice: false
      }
    }
  }),
  action
) {
  switch (action.type) {
    case "GET_CUSTOM_PARAMS_START":
      return state.set("isFetching", true);
    case "GET_CUSTOM_PARAMS_END":
      localStorage.setItem('customParams',JSON.stringify(action.data));
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("customParams", Immutable.fromJS(action.data));
      });
    case "GET_CUSTOM_PARAMS_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    case "SET_CUSTOM_PARAMS":
      localStorage.setItem('customParams',JSON.stringify(action.data));
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("customParams", Immutable.fromJS(action.data));
      });
    default:
      return state;
  }
}
