import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import sideStyle from "./style.module.css";
import {
  CurrentFileName,
  getFileNameAsync,
  getDataObjectAsync,
} from "../store/actionCreators";
import MyForm from "./MyForm";

export default function SlidingTabs() {
  // 从redux的store对象中提取数据(state)。
  const { addFileName, addFileData, currentName } = useSelector(
    (state) => ({
      addFileName: state.components.addFileName,
      addFileData: state.components.addFileData,
      currentName: state.components.currentName,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // 增加表单是否可见
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState(false);
  // 增加表单的form
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(
      getFileNameAsync(JSON.parse(localStorage.getItem("fileName")) || [])
    );
  }, [dispatch]);
  // 显示表单
  const onVisible = () => {
    setVisible(true);
  };
  // 关闭表单
  const onCancel = () => {
    setVisible(false);
    // 表单重置
    form.resetFields();
  };
  // 提交表单，并且表单验证通过后执行的方法, 添加列表
  const addFormOK = () => {
    // validateFields() 触发表单验证,得到了表单提交的数据value
    form.validateFields().then(async (value) => {
      if (addFileName.indexOf(value.LabelName) >= 0) {
        window.alert("标签名重复了");
        return;
      }
      const FileNameList = [...addFileName, value.LabelName];

      dispatch(getFileNameAsync(FileNameList));

      setVisible(false);
      // 表单重置
      form.resetFields();
    });
  };
  // 存储当前文件名
  const setFileName = (res) => {
    dispatch(CurrentFileName(res));
  };
  //鼠标移入、移出的回调,{高阶函数（柯里化），返回一个函数}
  const handleMouse = (flag) => {
    return () => {
      setMouse(flag);
    };
  };
  // 删除
  const handleDelete = (item) => {
    if (window.confirm("确定删除吗？")) {
      console.log(item);
      // filter过滤
      const filterFileData = addFileData.filter((items) => {
        return items.FileName !== item;
      });
      const filterFileName = addFileName.filter((items) => {
        return items !== item;
      });
      console.log("filterFileData", filterFileData);
      dispatch(getDataObjectAsync([...filterFileData]));
      dispatch(getFileNameAsync([...filterFileName]));
    }
  };
  return (
    <div>
      <Button type="primary" onClick={onVisible} className={sideStyle.button}>
        添加
      </Button>
      <ul>
        {addFileName.map((item, index) => {
          return (
            <li
              style={{
                backgroundColor: item === currentName ? "#00b7fa" : "white",
              }}
              className={sideStyle.li}
              key={index}
              onClick={(e) => {
                setFileName(item);
              }}
              onMouseEnter={handleMouse(true)}
              onMouseLeave={handleMouse(false)}
            >
              <span>{item}</span>
              <button
                className={sideStyle.btnDanger}
                style={{ display: mouse ? "block" : "none" }}
                onClick={() => {
                  handleDelete(item);
                }}
              >
                删除
              </button>
            </li>
          );
        })}
      </ul>
      {/* 新增表单 */}
      <Modal
        visible={visible}
        title="创建"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => addFormOK()}
      >
        {/* 封装的Form表单 */}
        <MyForm formParam={form} />
      </Modal>
    </div>
  );
}
