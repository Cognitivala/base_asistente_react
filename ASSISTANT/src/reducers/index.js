import { combineReducers } from "redux";
import { saludoStates } from "./saludo";
import { customParamsStates } from "./customParams";
import { launcherStates } from "./launcher";
import { assistantStates } from "./assistant";
import { cidStates } from "./cid";
import { ayudaStates } from "./ayuda";
import { conversationsStates } from "./conversations";

export const reducers = combineReducers({
  launcherStates,
  customParamsStates,
  saludoStates,
  assistantStates,
  cidStates,
  ayudaStates,
  conversationsStates
});
