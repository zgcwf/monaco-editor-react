import * as actionTypes from "./constants";
// 新增文件名
const addLabelName = (res) => ({
  type: actionTypes.FILENAME,
  addFileName: res,
});

export const getFileNameAsync = (data) => {
  return (dispatch) => {
    localStorage.setItem("fileName", JSON.stringify(data));
    dispatch(addLabelName(data));
  };
};

// 新增代码
export const addData = (res) => ({
  type: actionTypes.FILEDATA,
  addFileCode: res,
});
// 新增数据
export const getDataObject = (res) => ({
  type: actionTypes.GETDATA,
  addFileData: res,
});
export const getDataObjectAsync = (data) => {
  return (dispatch) => {
    localStorage.setItem("data", JSON.stringify(data));
    dispatch(getDataObject(data));
  };
};
// 获取当前文件名
export const CurrentFileName = (res) => ({
  type: actionTypes.SETFILENAME,
  currentName: res,
});
