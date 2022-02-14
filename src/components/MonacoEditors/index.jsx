import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { addData } from "../store/actionCreators";

export default function MonacoEditors() {
  // 从redux的store对象中提取数据(state)。
  const { addFileCode } = useSelector(
    (state) => ({
      addFileCode: state.components.addFileCode,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const editorDidMount = (editor, monaco) => {
    // console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    // this.editor = editor;
    // editor.focus();
  };
  const onChange = (newValue, e) => {
    // console.log("onChange", newValue, e);
    dispatch(addData(newValue));
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
        value={addFileCode}
        options={options}
        theme="vs-dark"
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </>
  );
}
