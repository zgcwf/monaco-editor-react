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
      // add new file
      const tempAdd = state.addFileData;
      tempAdd.push({ id: "001", FileCode: "", FileName: action.addFileName });
      return { ...state, addFileData: tempAdd };
    case actionTypes.FILECODE:
      return { ...state, addFileCode: action.addFileCode };
    case actionTypes.GETDATA:
      // 问题2
      const temp = state.addFileData;
      temp.map((t) => {
        if (action.addFileData.currentName === t.FileName) {
          t.FileCode = action.addFileData.code;
        }
        return t;
      });
      return { ...state, addFileData: temp };
    case actionTypes.SETFILENAME:
      return { ...state, currentName: action.currentName };
    default:
      return state;
  }
}
export default reducer;
