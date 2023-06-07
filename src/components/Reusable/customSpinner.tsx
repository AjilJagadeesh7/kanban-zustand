import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CustomSpinner = () => {
  const antIcon = (
    <LoadingOutlined className="text-white" style={{ fontSize: 24 }} spin />
  );
  return <Spin indicator={antIcon} />;
};

export default CustomSpinner;
