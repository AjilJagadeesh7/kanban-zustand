import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";

const SignIn = () => {
  const toggleDarkMode = useThemeStore((store) => store.toggleDarkMode);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Handle form submission logic here
  };
  return (
    <div className="w-full h-full text-primaryDark dark:text-white">
      <div
        className="w-full h-full py-[30%] dark:bg-secondaryDark bg-primaryLight
        rounded-md p-6"
      >
        <h2
          className="text-2xl font-bold mb-4 text-center"
          onClick={() => toggleDarkMode()}
        >
          Sign In
        </h2>
        <Form className="flex flex-col text-center" onFinish={onFinish}>
          <Form.Item
            className="w-[90%] md:w-[75%] xl:w-[50%] self-center"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            className="w-[90%] md:w-[75%] xl:w-[50%] self-center"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item className="w-[90%] md:w-[75%] xl:w-[50%] self-center">
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
          <div className="font-normal text-xs dark:text-white ">
            Don't have an account?{" "}
            <span
              className="underline font-medium text-xs cursor-pointer dark:text-red-500 text-red-800"
              onClick={() => navigate("/register")}
            >
              Sign up here!
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
