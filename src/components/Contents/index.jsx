import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import contentStyle from "./style.module.css";
import { changeDataObjectAsync } from "../store/actionCreators";

import MonacoEditors from "../MonacoEditors";
import SlidingTabs from "../SideMeau";

export default function Contents() {
  const dispatch = useDispatch();

  // 从redux的store对象中提取数据(state)。
  const { setFileData, currentName } = useSelector(
    (state) => ({
      setFileData: state.components.setFileData,
      currentName: state.components.currentName,
    }),
    shallowEqual
  );

  const [code, setCode] = useState(
    setFileData.length === 0
      ? ""
      : setFileData.find((file) => file.fileName === currentName)?.fileCode
  );

  useEffect(() => {
    setCode(
      setFileData.length === 0
        ? ""
        : setFileData.find((file) => file.fileName === currentName)?.fileCode
    );
  }, [currentName]);

  // 保存
  const saveData = () => {
    dispatch(changeDataObjectAsync(code, currentName));
  };
  return (
    <div>
      <div className={contentStyle.Contents}>
        <div className={contentStyle.side}>
          <SlidingTabs />
        </div>

        <div className={contentStyle.content}>
          <MonacoEditors code={code} setCode={setCode} />
        </div>

        <div className={contentStyle.footer}>
          <Button
            type="primary"
            className={contentStyle.button}
            onClick={saveData}
          >
            Save
          </Button>
          <Button type="primary" className={contentStyle.button}>
            Run
          </Button>
        </div>
      </div>
    </div>
  );
}
