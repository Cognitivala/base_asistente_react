import * as Immutable from "immutable";

export function launcherStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    notification: null,
    active: true,
    circle: true
  }),
  action
) {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return state.set("notification", action.data);
    case "CLOSE_LAUNCHER":
      return state.withMutations(map => {
        map.set("notification", null).set("active", false).set("circle",false)
      });
    case "OPEN_LAUNCHER":
      return state.set("active", true);
    case "GET_LAUNCHER_START":
      return state.set("isFetching", true);
    case "GET_LAUNCHER_END":
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("launcher", Immutable.fromJS(action.data));
      });
    case "GET_LAUNCHER_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    default:
      return state;
  }
}
