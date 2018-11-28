import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { persistReducer } from "redux-persist";
import uiStateReducer from "./modules/uiState";

import localForage from "localforage";

const uiStateStorageConfig = {
  key: "uiState",
  storage: localForage,
  whitelist: ["applicationMenuVisible", "applicationMenuActiveKey"]
};

const appReducer = combineReducers({
  routing: routerReducer,
  uiState: persistReducer(uiStateStorageConfig, uiStateReducer),

});

const rootReducer = (state, action) => {
  if (action.type === "RESET_ALL") {
    Object.keys(state).forEach(key => {
      localForage.removeItem(`persist:${key}`);
    });

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export function resetAll() {
  console.log("RESET_ALL");
  return dispatch => {
    dispatch({
      type: "RESET_ALL"
    });
  };
}

export default rootReducer;
