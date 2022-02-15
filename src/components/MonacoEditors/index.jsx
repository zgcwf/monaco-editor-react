import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { addFileCodeAsync } from "../store/actionCreators";

export default function MonacoEditors({ code, setCode }) {
  // 从redux的store对象中提取数据(state)。
  // const { addFileCode, addFileName, addFileData, currentName } = useSelector(
  //   (state) => {
  //     return {
  //       addFileCode: state.components.addFileCode,
  //       addFileName: state.components.addFileName,
  //       addFileData: state.components.addFileData,
  //       currentName: state.components.currentName,
  //     };
  //   },
  //   shallowEqual
  // );
  // const dispatch = useDispatch();

  // const [stateData, setStateData] = useState();

  // const [code, setCode] = useState(
  //   addFileData.length === 0 ? "" : addFileData[0].FileCode
  // );

  // useEffect(() => {
  //   addFileData.forEach((item) => {
  //     if (item.FileName === currentName) {
  //       setStateData(item.FileCode);
  //     }
  //   });
  // }, [currentName, addFileData]);

  const onChange = (newValue, e) => {
    setCode(newValue);
    // dispatch(addFileCodeAsync(newValue));
  };

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: false,
  };
  return (
    <>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        value={code}
        options={options}
        theme="vs-dark"
        onChange={onChange}
      />
    </>
  );
}
