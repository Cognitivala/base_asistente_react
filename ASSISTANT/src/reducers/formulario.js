import * as Immutable from "immutable";

export function formularioStates(
  state = Immutable.fromJS({
    enabled: false,
    error: false,
    isFetching: false
  }),
  action
) {
  switch (action.type) {
    case "SEND_FORM_START":
      return state.set("isFetching", true);
    case "SEND_FORM_END":
      return state.set("isFetching", false);
    case "ENABLED_FORM":
      return state.set("enabled", true);
    case "DISABLED_FORM":
      return state.set("enabled", false);
    default:
      return state;
  }
}
