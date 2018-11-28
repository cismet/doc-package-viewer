import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import localForage from "localforage";


const appReducer = combineReducers({
  routing: routerReducer,
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
