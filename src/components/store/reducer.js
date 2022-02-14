import * as actionTypes from "./constants";

const defaultState = {
  addFileName: [],
  addFileCode: "",
  addFileData: [],
  currentName: "",
};
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FILENAME:
      return { ...state, addFileName: action.addFileName };
    case actionTypes.FILECODE:
      return { ...state, addFileCode: action.addFileCode };
    case actionTypes.GETDATA:
      return { ...state, addFileData: action.addFileData };
    case actionTypes.SETFILENAME:
      return { ...state, currentName: action.currentName };
    default:
      return state;
  }
}
export default reducer;
