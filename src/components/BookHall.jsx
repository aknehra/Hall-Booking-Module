import React from "react";
import {
  Col,
  Row,
  Select,
  Image,
  Input,
  Button,
  DatePicker,
  Space,
} from "antd";
import { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import baseURL from "../baseURL";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const disabledDate = (current) => {
  return current && current < moment().endOf("day");
};

const BookHall = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [purpose, setPurpose] = useState("");
  const [remark, setRemark] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState("");
  const [display, setDisplay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allHalls, setAllHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState({});
  const [images, setImages] = useState([]);

  const { Option } = Select;

  const handleChange = (value) => {
    setImages([]);
    // for (let index in allHalls[value].images) {
    //   var data = `data:image/png;base64,${allHalls[value].images[index]}`;
    //   fetch(data)
    //     .then((res) => res.blob())
    //     .then((blob) => {
    //       setImages((images) => [...images, window.URL.createObjectURL(blob)]);
    //     });
    // }
    setImages(allHalls[value].images);
    setSelectedHall(allHalls[value]);
  };

  const postBookForm = () => {
    if (count == undefined) {
      Swal.fire({
        icon: "error",
        text: "Input Field is not in correct format !",
      });
    }
    if (
      start == undefined ||
      start.length === 0 ||
      end.length === 0 ||
      end == undefined ||
      count.length === 0 ||
      purpose.length === 0
    ) {
      Swal.fire("Mandatory Fields are Required");
      return;
    } else {
      setLoading(true);
      axios({
        method: "GET",
        url: baseURL + "/hall/list/",
        params: {
          start: start,
          end: end,
          occupancy: count,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      }).then((response) => {
        setLoading(false);
        setAllHalls(response.data);
        setDisplay(true);
      });
    }
  };

  const bookHall = () => {
    axios({
      method: "POST",
      url: baseURL + "/hall/book/",
      data: {
        hall: selectedHall.id,
        start: start,
        end: end,
        purpose: purpose,
        occupancy: count,
        remarks: remark,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then((response) => {
      document.getElementById("form1").reset();
      document.getElementById("form2").reset();
      setSelectedHall({});
      setImages([]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Hall Booked Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      nav("empBookings");
    });
  };

  return (
    <div>
      <form style={{ display: !display ? "block" : "none" }} id="form1">
        <Row>
          <Col span={12}>
            <span
              style={{
                fontSize: "3rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              Hall Booking Form
            </span>
          </Col>
          <Col span={8}></Col>
          <Col span={4} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
            <span style={{ fontSize: "0.9rem" }}>
              &nbsp;&nbsp;Mandatory Fields
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col span={1}></Col>
          <Col span={12}>
            <span
              style={{
                fontSize: "1.9rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              Booking Duration&nbsp;
            </span>
            <span style={{ fontSize: "1.9rem", color: "red" }}>*</span>
            &nbsp;&nbsp;
            <span
              style={{
                fontSize: "1.9rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              :
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={15}>
            <Space direction="vertical">
              <RangePicker
                disabledDate={disabledDate}
                showTime
                onChange={(e) => {
                  setStart(e[0].toISOString());
                  setEnd(e[1].toISOString());
                }}
              />
            </Space>
          </Col>
        </Row>
        <Row style={{ marginTop: "3rem" }}>
          <Col span={1}></Col>
          <Col span={10}>
            <span
              style={{
                fontSize: "1.8rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              Participant's Count&nbsp;
            </span>
            <span style={{ fontSize: "1.8rem", color: "red" }}>*</span>
            &nbsp;&nbsp;
            <span
              style={{
                fontSize: "1.8rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              :
            </span>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <span
              style={{
                fontSize: "1.8rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              Purpose&nbsp;
            </span>
            <span style={{ fontSize: "1.8rem", color: "red" }}>*</span>
            &nbsp;&nbsp;
            <span
              style={{
                fontSize: "1.8rem",
                color: "#001529",
                fontFamily: "-moz-initial",
              }}
            >
              :
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={11}>
            <Input
              type={"number"}
              min={1}
              max={100000}
              style={{ width: "100%" }}
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
            <Row style={{ marginTop: "0.5rem" }}>
              <Col span={24}>
                <span
                  style={{
                    fontSize: "1.8rem",
                    color: "#001529",
                    fontFamily: "-moz-initial",
                  }}
                >
                  Remark :
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input onChange={(e) => setRemark(e.target.value)} />
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <TextArea
              showCount
              maxLength={250}
              style={{
                height: 120,
                resize: "none",
              }}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "2.3rem" }}>
          <Col span={20}></Col>
          <Col span={3}>
            <Button
              id="nextbtn"
              type="primary"
              style={{
                borderRadius: "0.8rem",
                fontSize: "1rem",
                fontWeight: "bold",
                height: "2.5rem",
                width: "9rem",
              }}
              onClick={postBookForm}
              loading={loading}
            >
              Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                  marginTop: "-1.6rem",
                  marginLeft: "5.5rem",
                  width: "2rem",
                  height: "1.5rem",
                }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Button>
          </Col>
        </Row>
      </form>
      <form style={{ display: display ? "block" : "none" }} id="form2">
        <Row>
          <Col span={6}>
            {" "}
            <Button
              onClick={() => {
                setDisplay(false);
                setSelectedHall({});
                setAllHalls([]);
                setImages([]);
              }}
            >
              Back
            </Button>
          </Col>
          <Col span={12}>
            <center>
              <span style={{ fontSize: "3.5rem" }}>Select Hall</span>
            </center>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row style={{ marginTop: "2rem", display: "flex" }}>
          <Col span={2}>
            <BsFillCaretRightFill style={{ fontSize: "2rem" }} />
          </Col>
          <Col span={22}>
            <Select
              defaultValue="Select One"
              style={{
                width: "25rem",
              }}
              onChange={handleChange}
            >
              {allHalls.map((item, index) => {
                return (
                  <Option key={item.id} value={index}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col span={2}></Col>
          <Col span={6} style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Maximum Occupancy :
          </Col>
          <Col span={2}>
            <span style={{ fontSize: "1.3rem" }}>{selectedHall.occupancy}</span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={6} style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Maximum Booking Days :
          </Col>
          <Col span={2}>
            <span style={{ fontSize: "1.3rem" }}>
              {selectedHall.max_booking_day}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={5} style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Hall Description :
          </Col>
          <Col span={8}>
            <span style={{ fontSize: "1.3rem" }}>{selectedHall.desc}</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col span={8}></Col>
          <Col span={8}>
            <center>
              <Image
                preview={{
                  visible: false,
                }}
                width={200}
                src={images[0]}
                onClick={() => setVisible(true)}
              />
              <div
                style={{
                  display: "none",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {images.map((item, index) => {
                    return <Image src={item} key={index} />;
                  })}
                </Image.PreviewGroup>
              </div>
            </center>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col span={20}></Col>
          <Col span={4}>
            {" "}
            <Button
              type="primary"
              style={{
                height: "2.5rem",
                fontSize: "1.3rem",
                borderRadius: "0.5rem",
              }}
              onClick={bookHall}
            >
              Book Hall
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default BookHall;
