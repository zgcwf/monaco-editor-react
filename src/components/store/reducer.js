import * as actionTypes from "./constants";

const defaultState = {
  setFileData: [],
  currentName: "",
};
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.LABELFILE:
      return { ...state, setFileData: action.setFileList };
    case actionTypes.SETDATAOBJECT:
      return { ...state, setFileData: action.setFileData };
    case actionTypes.SETFILENAME:
      return { ...state, currentName: action.currentName };
    default:
      return state;
  }
}
export default reducer;
