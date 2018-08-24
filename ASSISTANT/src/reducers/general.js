import * as Immutable from "immutable";

export function generalStates(
  state = Immutable.fromJS({
    cid: null,
    origen: "Desktop",
    nodo_id: null,
    intent: null,
    auth: null,
    token: null,
    location: null
  }),
  action
) {
  switch (action.type) {
    case "SET_CID":
      return state.set("cid", action.data);
    case "SET_ORIGEN":
      return state.set("cid", action.data);
    case "SET_NODO_ID":
      return state.set("cid", action.data);
    case "SET_INTENT":
      return state.set("cid", action.data);
    case "SET_AUTH":
      return state.set("cid", action.data);
    case "SET_TOKEN":
      return state.set("cid", action.data);
    default:
      return state;
  }
}
