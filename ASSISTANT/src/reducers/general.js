import * as Immutable from "immutable";

export function generalStates(
  state = Immutable.fromJS({
    cid: null,
    origen: null,
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
      return state.set("origen", action.data);
    case "SET_NODO_ID":
      return state.set("nodo_id", action.data);
    case "SET_INTENT":
      return state.set("intent", action.data);
    case "SET_AUTH":
      return state.set("auth", action.data);
    case "SET_TOKEN":
      return state.set("token", action.data);
    case "SET_LOCATION":
      return state.set("location", action.data);
    case "DEFAULT_GENERAL":
      return state.withMutations(map =>{
        map.set("cid", null)
        .set("origen", null)
        .set("nodo_id", null)
        .set("intent", null)
        .set("auth", null)
        .set("token", null)
      });
    case "SET_GENERAL":
      return state.withMutations(map =>{
        map.set("cid", action.data.cid)
        .set("origen", action.data.origen)
        .set("nodo_id", action.data.nodo_id)
        .set("intent", action.data.intent)
        .set("auth", action.data.auth)
        .set("token", action.data.token)
      });
    default:
      return state;
  }
}
