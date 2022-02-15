import * as actionTypes from "./constants";
// 新增文件名
const addLabelName = (res) => ({
  type: actionTypes.FILENAME,
  addFileName: res,
});

export const FileNameListAsync = (data) => {
  return (dispatch) => {
    // localStorage.setItem("fileName", JSON.stringify(data));
    dispatch(addLabelName(data));
  };
};

// 新增代码
export const addFileCodeAsync = (res) => ({
  type: actionTypes.FILECODE,
  addFileCode: res,
});
// 新增数据
export const addDataObject = (res) => ({
  type: actionTypes.GETDATA,
  addFileData: res,
});
export const changeDataObjectAsync = (code, currentName) => {
  return (dispatch) => {
    // localStorage.setItem("data", JSON.stringify(data));
    // dispatch(addDataObject(data));
    dispatch(addDataObject({ code, currentName }));
  };
};
// 获取当前文件名
export const CurrentFileName = (res) => ({
  type: actionTypes.SETFILENAME,
  currentName: res,
});
