import * as Immutable from "immutable";

export function conversationsStates(
  state = Immutable.fromJS({
    isFetching: false,
    error: "",
    conversations: [
      // {
      //   general:{
      //     cid: null,
      //     origen: null,
      //     nodo_id: null,
      //     intent: null,
      //     auth: null,
      //     token: null,
      //     location: null
      //   },
      //   msg:null,
      //   buttons:null,
      //   send:null,
      //   enabled: false
      // }
    ],
    loading: false
  }),
  action
) {
  switch (action.type) {
    case "GET_CONVERSATIONS_START":
      return state.set("isFetching", true);
    case "GET_CONVERSATIONS_END":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", false);
      });
    case "GET_CONVERSATIONS_ERROR":
      return state.withMutations(map => {
        map.set("isFetching", false).set("error", action.error);
      });
    case "SET_HISTORY":
      return state.set("conversations", Immutable.fromJS(action.data));
    case "SET_MODAL":
      return state.set("modal", action.data);
    case "UPDATE_CONVERSATION_CALENDAR":
    debugger
      return state.setIn(["conversations", (state.get('conversations').size - 1).toString() , "datepicker"],Immutable.fromJS(action.data.datepicker))
    case "PUSH_CONVERSATION":
      return state.withMutations(map => {
        const conversation = Immutable.fromJS(action.data);
        action.data.send === "to"
          ? map.set("loading", true)
          : map.set("loading", false);
        map.update("conversations", list => list.push(conversation));
      });
    case "DELETE_HISTORY":
    debugger
      return state.withMutations(map => {
        map.set("conversations",Immutable.fromJS([]));
      });
    default:
      return state;
  }
}
