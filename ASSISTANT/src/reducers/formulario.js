import * as Immutable from "immutable";

export function formularioStates(
  state = Immutable.fromJS({
    enabled: false,
    error: false
  }),
  action
) {
  switch (action.type) {
    case "ENABLED_FORM":
      return state.set("enabled", true);
    case "DISABLED_FORM":
      return state.set("enabled", false);
    default:
      return state;
  }
}
