import React from "react";
import MonacoEditor from "react-monaco-editor";

export default function MonacoEditors({ code, setCode }) {
  const onChange = (newValue, e) => {
    setCode(newValue);
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
