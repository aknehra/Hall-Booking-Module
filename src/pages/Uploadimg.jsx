import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { data } from "autoprefixer";
import React from "react";

const Uploadimg = ({ setImages, images }) => (
  <Upload
    multiple={true}
    beforeUpload={(file) => {
      const isJPEG = file.type === "image/jpeg";
      if (!isJPEG) {
        message.error(`${file.name} is not a jpeg file`);
      }

      return isJPEG || Upload.LIST_IGNORE;
    }}
    onChange={(e) => {
      data = [];
      e.fileList.forEach((item) => {
        data.push(item.originFileObj);
      });
      setImages(data);
    }}
    customRequest={() => {}}
    defaultFileList={images}
  >
    <Button icon={<UploadOutlined />}>
      <span style={{ color: "#001529", fontFamily: "-moz-initial" }}>
        Upload Hall Images (<span style={{ color: "red"}}>*</span>.jpg)
      </span>
    </Button>
  </Upload>
);

export default Uploadimg;
