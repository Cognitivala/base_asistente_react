import * as Immutable from "immutable";

export function voiceStates(
  state = Immutable.fromJS({
    enabled: false
  }),
  action
) {
  switch (action.type) {
    case "ENABLED_VOICE":
      return state.set("enabled", true);
    case "DISABLED_VOICE":
      return state.set("enabled", false);
    default:
      return state;
  }
}
