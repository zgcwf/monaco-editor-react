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
  const { addFileName, addFileCode, addFileData } = useSelector(
    (state) => ({
      addFileName: state.components.addFileName,
      addFileCode: state.components.addFileCode,
      addFileData: state.components.addFileData,
    }),
    shallowEqual
  );
  // console.log(addFileName, addFileCode);

  console.log("1", JSON.parse(localStorage.getItem("data")) || []);
  const getItemData = () => {
    dispatch(
      getDataObjectAsync(JSON.parse(localStorage.getItem("data")) || [])
    );
  };
  useEffect(() => {
    getItemData();
  }, []);
  // 点击保存
  const saveData = () => {
    // 对象要转化成字符串
    const data = {
      id: "001",
      addFileName: addFileName,
      addFileCode: addFileCode,
    };
    console.log("data", data);
    // if(data.addFileName){
    // 如果当前文件名存在，选中当前文件名，将变化的addFileCode加入其中
    // }如果当前文件名不存在，创建新文件
    // 未完成：根据不同的文件名显示不同的内容
    // 问题1：怎样得到当前的文件名
    const dataAll = [...addFileData, data];
    localStorage.setItem("data", JSON.stringify(dataAll));
    getItemData();
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
