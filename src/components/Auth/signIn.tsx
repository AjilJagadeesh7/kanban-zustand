import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

const SignIn = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Handle form submission logic here
  };
  return (
    <div className="flex flex-col items-center justify-center h-full md:bg-gray-200">
      <div className="w-full max-w-sm bg-gray-100 md:shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
