import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import sideStyle from "./style.module.css";
import { CurrentFileName, getFileNameAsync } from "../store/actionCreators";
import MyForm from "./MyForm";

export default function SlidingTabs() {
  // 从redux的store对象中提取数据(state)。
  const { addFileName, addFileCode, addFileData } = useSelector(
    (state) => ({
      addFileName: state.components.addFileName,
      addFileCode: state.components.addFileCode,
      addFileData: state.components.addFileData,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // 增加表单是否可见
  const [visible, setVisible] = useState(false);
  // 增加表单的form
  const [form] = Form.useForm();

  const getFileName = () => {
    dispatch(
      getFileNameAsync(JSON.parse(localStorage.getItem("fileName")) || [])
    );
  };

  useEffect(() => {
    getFileName();
  }, []);

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
      localStorage.setItem("fileName", JSON.stringify(FileNameList));
      getFileName();

      setVisible(false);
      // 表单重置
      form.resetFields();
    });
  };
  // 存储当前文件名
  const setFileName = (res) => {
    dispatch(CurrentFileName(res));
  };
  return (
    <div>
      <Button type="primary" onClick={onVisible} className={sideStyle.button}>
        添加
      </Button>
      <ul>
        {addFileName.map((index, item) => {
          console.log("index", index);
          return (
            <li
              className={sideStyle.li}
              key={item}
              onClick={(e) => {
                setFileName(index);
              }}
            >
              {index}
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
