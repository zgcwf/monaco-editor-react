import React, { useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import contentStyle from "./style.module.css";
import { getDataObjectAsync } from "../store/actionCreators";

import MonacoEditors from "../MonacoEditors";
import SlidingTabs from "../SideMeau";

export default function Contents() {
  const dispatch = useDispatch();

  // 从redux的store对象中提取数据(state)。
  const { addFileCode, addFileData, currentName } = useSelector(
    (state) => ({
      addFileCode: state.components.addFileCode,
      addFileData: state.components.addFileData,
      currentName: state.components.currentName,
    }),
    shallowEqual
  );

  // 点击保存
  const saveData = () => {
    // 对象要转化成字符串
    const file = addFileData.find((file) => file.FileName === currentName);
    if (file) {
      // update
      file.FileName = currentName;
      file.FileCode = addFileCode;
    } else {
      // add
      const data = {
        id: "001",
        FileName: currentName,
        FileCode: addFileCode,
      };
      addFileData.push(data);
    }
    dispatch(getDataObjectAsync([...addFileData]));
  };
  return (
    <div>
      <div className={contentStyle.Contents}>
        <div className={contentStyle.side}>
          <SlidingTabs />
        </div>

        <div className={contentStyle.content}>
          <MonacoEditors />
        </div>

        <div className={contentStyle.footer}>
          <Button
            type="primary"
            className={contentStyle.button}
            onClick={(e) => saveData()}
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
