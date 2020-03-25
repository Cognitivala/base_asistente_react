import * as Immutable from "immutable";

export function assistantStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    active: false,
    minimized: false,
    useChattigo: false,
    chattigoData: {},
  }),
  action
) {
  switch (action.type) {
    case "OPEN_ASSISTANT":
        return state.set('active',true);
    case "CLOSE_ASSISTANT":
        return state.set('active',false);
    case "GET_ASSISTANT_START":
      return state.set("isFetching", true);
    case "TOGGLE_MINIMIZED":
      return state.set("minimized", action.data);
    case "GET_ASSISTANT_END":
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("customParams", Immutable.fromJS(action.data));
      });
    case "GET_ASSISTANT_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    case "USE_CHATTIGO": 
      return state.set("useChattigo", action.data);
    case "CHATTIGO_DATA": 
      return state.set("chattigoData", action.data);
    default:
      return state;
  }
}
