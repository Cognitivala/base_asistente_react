import * as Immutable from "immutable";

export function saludoStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    saludo: {
      cid: null,
      msg: [""],
      send: ""
    },
    send: false
  }),
  action
) {
  switch (action.type) {
    case "GET_SALUDO_START":
      return state.set("isFetching", true);
    case "GET_SALUDO_END":
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("saludo", Immutable.fromJS(action.data))
      });
    case "GET_SALUDO_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    case "SEND_SALUDO":
      return state.set('send',true);
    default:
      return state;
  }
}
