import React from "react";
import { Space, Spin } from "antd";

const Loader = () => {
  return (
    <div style={{ marginTop: "13rem" }}>
      <center>
        <Space size="middle">
          <Spin size="large" />
        </Space>
        <h1 style={{ fontSize: "1.5rem" }}>Please Wait ...</h1>
      </center>
    </div>
  );
};

export default Loader;
