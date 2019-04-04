import * as Immutable from "immutable";

export function inputStates(
  state = Immutable.fromJS({
    enabled: true,
    isFetching: false,
    error: false,
    openHelp: false,
    openEmoji: false,
    openVoice: false,
    openInput: true,
    enabledHelp: true,
    enabledEmoji: true,
    enabledVoice: true,
    enabledInput: true,
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
    case "OPEN_HELP":
      return state.withMutations(map=>{
        map.set("openHelp",true)
          .set("openVoice",false)
          .set("openEmoji",false)
          .set("enabledHelp",true)
          .set("enabledEmoji",false)
          .set("enabledVoice",false)
          .set("enabledInput",false)
      });
    case "CLOSE_HELP":
      return state.withMutations(map=>{
        map.set("openHelp",false)
          .set("openVoice",false)
          .set("openEmoji",false)
          .set("enabledHelp",true)
          .set("enabledEmoji",true)
          .set("enabledVoice",true)
          .set("enabledInput",true)
      });
    case "OPEN_EMOJI":
      return state.withMutations(map=>{
        map.set("openHelp",false)
          .set("openVoice",false)
          .set("openEmoji",true)
          .set("enabledHelp",false)
          .set("enabledEmoji",true)
          .set("enabledVoice",false)
          .set("enabledInput",true)
      });
    case "CLOSE_EMOJI":
      return state.withMutations(map=>{
        map.set("openHelp",false)
          .set("openVoice",false)
          .set("openEmoji",false)
          .set("enabledHelp",true)
          .set("enabledEmoji",true)
          .set("enabledVoice",true)
          .set("enabledInput",true)
      });
    case "OPEN_VOICE":
      return state.withMutations(map=>{
        map.set("openHelp",false)
          .set("openVoice",true)
          .set("openEmoji",false)
          .set("enabledHelp",false)
          .set("enabledEmoji",false)
          .set("enabledVoice",true)
          .set("enabledInput",true)
      });
    case "CLOSE_VOICE":
      return state.withMutations(map=>{
        map.set("openHelp",false)
          .set("openVoice",false)
          .set("openEmoji",false)
          .set("enabledHelp",true)
          .set("enabledEmoji",true)
          .set("enabledVoice",true)
          .set("enabledInput",true)
      });
    default:
      return state;
  }
}
