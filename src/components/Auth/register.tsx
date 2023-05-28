import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const RegisterForm = () => {
  const createUser = useAuthStore((store) => store.createUser);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { firstName, lastName, password, email } = values;
    if (firstName && lastName && password && email) {
      createUser(email, password, firstName, lastName);
    } else {
      console.error("Missing details");
    }
  };

  return (
    <div className="w-full h-full text-primaryDark dark:text-white rounded-md">
      <div
        className="w-full h-full py-[30%] bg-primaryLight dark:bg-secondaryDark
        rounded-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <Form className="flex flex-col text-center" onFinish={onFinish}>
          <Form.Item
            className="w-[90%] md:w-[75%] xl:w-[50%] self-center"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
          <Form.Item
            className="w-[90%] md:w-[75%] xl:w-[50%] self-center"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            className="w-[90%] md:w-[75%] xl:w-[50%] self-center"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
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
              Register
            </Button>
          </Form.Item>
          <div className="font-normal text-xs text-primaryDark dark:text-white">
            Already have an account?{" "}
            <span
              className="underline font-medium text-xs cursor-pointer
               dark:text-red-500 text-red-800"
              onClick={() => navigate("/signin")}
            >
              Log in here!
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
