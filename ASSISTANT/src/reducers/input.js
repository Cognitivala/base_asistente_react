import * as Immutable from "immutable";

export function inputStates(
  state = Immutable.fromJS({
    enabled: true
  }),
  action
) {
  switch (action.type) {
    case "ENABLED_INPUT":
      return state.set("enabled", true);
    case "DISABLED_INPUT":
      return state.set("enabled", false);
    default:
      return state;
  }
}
