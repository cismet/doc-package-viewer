import objectAssign from "object-assign";

///TYPES
export const types = {
  SCREEN_RESIZE: "UISTATE/SCREEN_RESIZE",
};

///INITIAL STATE
const initialState = {
  width: null,
  height: null
};

///REDUCER
export default function uiStateReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case types.SCREEN_RESIZE: {
      newState = objectAssign({}, state);
      newState.width = action.width;
      newState.height = action.height;
      return newState;
    }
    default:
      return state;
  }
}

///SIMPLEACTIONCREATORS
function screenResize(height, width) {
  return {
    type: types.SCREEN_RESIZE,
    width: width,
    height: height
  };
}
//COMPLEXACTIONS


//EXPORT ACTIONS
export const actions = {
  screenResize,
};
