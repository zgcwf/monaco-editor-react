import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import { useDispatch } from "react-redux";

import sideStyle from "./style.module.css";
import { addLabelName } from "../store/actionCreators";
import MyForm from "./MyForm";

export default function SlidingTabs() {
  const dispatch = useDispatch();
  // 增加表单是否可见
  const [visible, setVisible] = useState(false);
  // 增加表单的form
  const [form] = Form.useForm();
  useEffect(() => {
    localStorage.getItem("data");
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
      // 文件名
      dispatch(addLabelName(value.LabelName));
      //  关闭表单
      setVisible(false);
      // 表单重置
      form.resetFields();
    });
  };
  return (
    <div>
      <Button type="primary" onClick={onVisible} className={sideStyle.button}>
        添加
      </Button>
      <ul>
        <li className={sideStyle.li}>1</li>
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
