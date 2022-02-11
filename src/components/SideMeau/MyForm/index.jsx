import { forwardRef, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

// forwardRef包裹一个函数组件，接受两个形参props, ref,ref是形参，参数由父组件传递过来
const MyForm = forwardRef((props, ref) => {
  const { formParam } = props;

  return (
    <Form
      form={formParam}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="form_in_modal"
    >
      <Form.Item
        label="LabelName"
        name="LabelName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
});
export default MyForm;
