import * as Immutable from "immutable";

export function valoracionStates(
  state = Immutable.fromJS({
    enabled: false,
    starts: 0
  }),
  action
) {
  switch (action.type) {
    case "ENABLED_VALORACION":
      return state.set("enabled", true);
    case "DISABLED_VALORACION":
      return state.set("enabled", false);
    default:
      return state;
  }
}
