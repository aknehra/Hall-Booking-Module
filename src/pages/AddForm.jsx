import React from "react";
import { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import Uploadimg from "./Uploadimg";
import axios from "axios";
import baseURL from "../baseURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const AddForm = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [remark, setRemark] = useState();
  const [occupancy, setOccupancy] = useState();
  const [limit, setLimit] = useState();
  const [images, setImages] = useState([]);
  const nav = useNavigate();
  const postaddform = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("remarks", remark);
    formData.append("occupancy", occupancy);
    formData.append("max_booking_day", limit);
    images.forEach((file) => {
      formData.append("images", file);
    });

    if (occupancy == undefined || limit == undefined) {
      Swal.fire({
        icon: "error",
        text: "Input fields not in correct format !",
      });
    }
    if (
      name == undefined ||
      description == undefined ||
      name.length == 0 ||
      description.length == 0 ||
      occupancy.length == 0 ||
      limit.length == 0
    ) {
      Swal.fire("Mandatory Fields are Required");
    } else {
      axios({
        method: "POST",
        url: baseURL + "/hall/create/",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Hall Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("empBookings");
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Row>
        <Col span={20}></Col>
        <Col span={4}>
          <span style={{ fontSize: "1.3rem", color: "red" }}>*</span>
          <span style={{ fontSize: "0.9rem" }}>Mandatory Fields</span>
        </Col>
      </Row>
      <div className="grid gap-6 grid-cols-2">
        <Row>
          <Col span={24}>
            <span
              style={{
                fontSize: "2.5rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              Add Conference Hall
            </span>
          </Col>
        </Row>
        <br />
        <div>
          <label
            htmlFor="hallname"
            style={{
              fontSize: "1.2rem",
              color: "#001529",
              fontFamily: "-moz-initial",
            }}
          >
            Name : <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <Input
            placeholder="Type Name of Hall"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="occupancy"
            style={{
              fontSize: "1.2rem",
              color: "#001529",
              fontFamily: "-moz-initial",
            }}
          >
            Eligible Occupancy : <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <Input
            type={"number"}
            min={1}
            max={100000}
            onChange={(e) => setOccupancy(e.target.value)}
            placeholder={"Enter the occupancy limit of guests in hall"}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label
            htmlFor="decription"
            style={{
              fontSize: "1.2rem",
              color: "#001529",
              fontFamily: "-moz-initial",
            }}
          >
            Description : <span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <TextArea
            showCount
            maxLength={250}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "10rem" }}
          />
        </div>
        <div>
          <label
            htmlFor="dayslimit"
            style={{
              fontSize: "1.2rem",
              color: "#001529",
              fontFamily: "-moz-initial",
            }}
          >
            Booking Limit : <span style={{ color: "red" }}>*</span>
          </label>
          <br />{" "}
          <Input
            type={"number"}
            min={1}
            max={100000}
            onChange={(e) => setLimit(e.target.value)}
            placeholder={"Enter Continuous booking days limit"}
            style={{ width: "100%" }}
          />
          <br />
          <br />
          <label
            htmlFor="remark"
            style={{
              fontSize: "1.2rem",
              color: "#001529",
              fontFamily: "-moz-initial",
            }}
          >
            Remark :
          </label>
          <br />
          <TextArea
            showCount
            maxLength={100}
            onChange={(e) => setRemark(e.target.value)}
            style={{ height: "4.8rem" }}
          />
        </div>
        <div>
          <Uploadimg setImages={setImages} images={images} />
        </div>
        <div>
          {" "}
          <Button
            type="primary"
            style={{
              float: "right",
              height: "2.5rem",
              fontSize: "1rem",
              borderRadius: "1rem",
            }}
            onClick={postaddform}
            block
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
