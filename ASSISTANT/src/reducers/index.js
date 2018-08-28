import { combineReducers } from "redux";
import { saludoStates } from "./saludo";
import { customParamsStates } from "./customParams";
import { launcherStates } from "./launcher";
import { assistantStates } from "./assistant";
import { cidStates } from "./cid";
import { ayudaStates } from "./ayuda";
import { conversationsStates } from "./conversations";
import { inputStates } from "./input";
import { valoracionStates } from "./valoracion";
import { generalStates } from "./general";
import { formularioStates } from "./formulario";

export const reducers = combineReducers({
  generalStates,
  launcherStates,
  customParamsStates,
  saludoStates,
  assistantStates,
  cidStates,
  ayudaStates,
  conversationsStates,
  inputStates,
  valoracionStates,
  formularioStates
});
