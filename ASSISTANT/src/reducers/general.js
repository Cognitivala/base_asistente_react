import * as Immutable from "immutable";

export function generalStates(
    state = Immutable.fromJS({
        cid: null,
        origen: 1,
        nodo_id: null,
        intent: null,
        auth: null,
        token: sessionStorage.getItem('token'),
        location: null,
        id_cliente: "1",
        integracion: null,
        region: null,
        url_params: null
    }),
    action
) {
    switch (action.type) {
        case "SET_CID":
            return state.set("cid", action.data);
        case "SET_ORIGEN":
            return state.set("origen", action.data);
        case "SET_NODO_ID":
            return state.set("nodo_id", action.data);
        case "SET_INTENT":
            return state.set("intent", action.data);
        case "SET_AUTH":
            return state.set("auth", action.data);
        case "SET_TOKEN":
            return state.set("token", action.data);
        case "SET_LOCATION":
            return state.set("location", action.data);
        case "SET_INTEGRACION":
            return state.set("integracion", action.data);
        case "SET_URL_PARAMS":
            return state.set("url_params", action.data);
        case "SET_REGION":
            return state.set("region", action.data);
        case "DEFAULT_GENERAL":
            return state.withMutations(map => {
                console.log('DEFAULT_GENERAL:: ', map);
                map.set("cid", null)
                    .set("origen", 1)
                    .set("nodo_id", null)
                    .set("intent", null)
                    .set("auth", null)
                    // .set("token", null)
                    .set("integracion", null)
                    .set("region", null)
            });
        case "SET_GENERAL":
            return state.withMutations(map => {
                console.log('SET_GENERAL:: ', map);
                map.set("cid", action.data.cid);
                // map.set("token", sessionStorage.getItem('token'));
                map.set("token", sessionStorage.getItem('token'));
            });
        default:
            return state;
    }
}