import * as actionTypes from "./constants";

const defaultState = {
  addFileName: "",
  addFileCode: "",
  addFileData: [],
};
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.FILENAME:
      return { ...state, addFileName: action.addFileName };
    case actionTypes.FILEDATA:
      return { ...state, addFileCode: action.addFileCode };
    case actionTypes.GETDATA:
      return { ...state, addFileData: action.addFileData };
    default:
      return state;
  }
}
export default reducer;
