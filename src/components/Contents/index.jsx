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
  const { addFileData, currentName } = useSelector(
    (state) => ({
      addFileData: state.components.addFileData,
      currentName: state.components.currentName,
    }),
    shallowEqual
  );

  const [code, setCode] = useState(
    addFileData.length === 0
      ? ""
      : addFileData.find((file) => file.FileName === currentName)?.FileCode
  );
  // 问题1：要不要加addFileData
  useEffect(() => {
    setCode(
      addFileData.length === 0
        ? ""
        : addFileData.find((file) => file.FileName === currentName)?.FileCode
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
