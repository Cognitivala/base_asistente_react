import * as Immutable from "immutable";

export function customParamsStates(
    state = Immutable.fromJS({
        isFetching: false,
        error: "",
        customParams: {
            avatar: null,
            colorHeader: null,
            colorBtn: null,
            logo: null,
            subtitulo: null,
            titulo: null,
            url: null,
            userImg: null,
            estado: null,
            script: null,
            imgBackHeader: null,
            settings: {
                bubble: false,
                keep_conversation: false,
                geolocalization: false,
                help: false,
                attach: false,
                emoji: false,
                voice: false,
                position_help: "bottom",
            }
        }
    }),
    action
) {
    switch (action.type) {
        case "GET_CUSTOM_PARAMS_START":
            return state.set("isFetching", true);
        case "GET_CUSTOM_PARAMS_END":
            return state.withMutations(map => {
                map
                    .set("isFetching", false)
                    .set("error", false)
                    .mergeIn(['customParams'], state.get('customParams').concat(Immutable.fromJS(action.data)));
            });
        case "GET_CUSTOM_PARAMS_ERROR":
            return state.withMutations(map => {
                map.set("isFetching", false).set("error", action.error);
            });
        case "SET_CUSTOM_TITULO":
            return state.withMutations(map => {
                map.setIn(["customParams", "titulo"], action.data);
            });
        case "SET_CUSTOM_SUBTITULO":
            return state.withMutations(map => {
                map.setIn(["customParams", "subtitulo"], action.data);
            });
        case "SET_CUSTOM_COLOR_BTN":
            return state.withMutations(map => {
                map.setIn(["customParams", "colorBtn"], action.data);
            });
        case "SET_CUSTOM_COLOR_HEADER":
            return state.withMutations(map => {
                map.setIn(["customParams", "colorHeader"], action.data);
            });
        case "SET_CUSTOM_LOGO":
            return state.withMutations(map => {
                map.setIn(["customParams", "logo"], action.data);
            });
        case "SET_CUSTOM_AVATAR":
            return state.withMutations(map => {
                map.setIn(["customParams", "avatar"], action.data);
            });
        case "SET_CUSTOM_PARAMS":
            return state.withMutations(map => {
                map
                    .set("isFetching", false)
                    .set("error", false)
                    .set("customParams", Immutable.fromJS(JSON.parse(action.data)));
            });
        default:
            return state;
    }
}