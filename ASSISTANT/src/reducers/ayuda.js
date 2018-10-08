import * as Immutable from "immutable";

export function ayudaStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    open: false,
    enabled: true,
    showWarning: false,
    ayuda: [
        {
          "action": false, 
          "collapse": false, 
          "description": "", 
          "listChild": [
            {
              "title": ""
            }
          ], 
          "title": ""
        }
      ]
  }),
  action
) {
  switch (action.type) {
    case "GET_AYUDA_START":
      return state.set("isFetching", true);
    case "GET_AYUDA_END":
      return state.withMutations(map => {
        map
          .set("isFetching", false)
          .set("error", false)
          .set("ayuda", Immutable.fromJS(action.data));
      });
    case "GET_AYUDA_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    case "OPEN_HELP":
      return state.set('open',true);
    case "CLOSE_HELP":
      return state.set('open',false);
    case "ENABLED_HELP":
      return state.set('enabled',true);
    case "DISABLED_HELP":
      return state.set('enabled',false);
    case "SHOW_WARNING_HELP":
      return state.set('showWarning',true);
    case "SHOW_WARNING_HELP_END":
      return state.set('showWarning',false);
    default:
      return state;
  }
}
