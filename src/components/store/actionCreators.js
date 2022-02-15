import * as actionTypes from "./constants";

const setLabelFile = (res) => ({
  type: actionTypes.LABELFILE,
  setFileList: res,
});
// 新增文件
export const addFileListAsync = (name) => {
  return (dispatch, getState) => {
    const getFileData = getState().components.setFileData;
    getFileData.push({ id: "001", fileCode: "", fileName: name });

    dispatch(setLabelFile(getFileData));
  };
};
// 删除文件
export const delFileListAsync = (name) => {
  return (dispatch, getState) => {
    const getFileData = getState().components.setFileData;
    const filterFileData = getFileData.filter((items) => {
      return items.fileName !== name;
    });

    dispatch(setLabelFile(filterFileData));
  };
};
// 更改文件数据
const setDataObject = (res) => ({
  type: actionTypes.SETDATAOBJECT,
  setFileData: res,
});
export const changeDataObjectAsync = (code, currentName) => {
  return (dispatch, getState) => {
    const getFileData = getState().components.setFileData;
    const changeFileData = getFileData.map((item) => {
      if (currentName === item.fileName) {
        item.fileCode = code;
      }
      return item;
    });

    dispatch(setDataObject(changeFileData));
  };
};
// 获取当前文件名
export const CurrentFileName = (res) => ({
  type: actionTypes.SETFILENAME,
  currentName: res,
});
