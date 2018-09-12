import * as Immutable from "immutable";

export function inputStates(
  state = Immutable.fromJS({
    enabled: true,
    isFetching: false,
    error: false
  }),
  action
) {
  switch (action.type) {
    case "ENABLED_INPUT":
      return state.set("enabled", true);
    case "DISABLED_INPUT":
      return state.set("enabled", false);
    case "ATTACH_FILE_START":
      return state.set("isFetching", true);
    case "ATTACH_FILE_END":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", false);
      });
    case "ATTACH_FILE_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    default:
      return state;
  }
}
