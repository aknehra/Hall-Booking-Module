import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Row, Col, Table, Tag, Button, message } from "antd";
import baseURL from "../baseURL";
import Loader from "../components/Loader";

const columns = [
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Hall Name
        </span>
      </center>
    ),
    dataIndex: "hall_name",
    key: "hall_name",
    width: 160,
  },
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Guests Count
        </span>
      </center>
    ),
    dataIndex: "occupancy",
    key: "occupancy",
    width: 10,
  },
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Booking From
        </span>
      </center>
    ),
    dataIndex: "start",
    key: "start",
    width: 200,
    render: (start) => {
      return (
        <p>
          <b>Date :</b>&nbsp;{new Date(start).toLocaleDateString()} <br />
          <b>Time :</b>&nbsp;{new Date(start).toLocaleTimeString()}
        </p>
      );
    },
  },
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
          Booking To
        </span>
      </center>
    ),
    key: "end",
    dataIndex: "end",
    width: 200,
    render: (end) => {
      return (
        <>
          <p>
            <b>Date :</b> &nbsp;{new Date(end).toLocaleDateString()} <br />
            <b>Time :</b>&nbsp;
            {new Date(end).toLocaleTimeString()}
          </p>
        </>
      );
    },
  },
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Purpose</span>
      </center>
    ),
    key: "purpose",
    dataIndex: "purpose",
    width: 10,
  },
  {
    title: (
      <center>
        <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Status</span>
      </center>
    ),
    key: "level",
    dataIndex: "level",
    width: 350,
    render: (_, { status }) => (
      <div className="tagparent">
        {status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          let icon;

          if (tag.includes("waiting")) {
            color = "orange";
            icon = <ClockCircleOutlined />;
          }
          if (tag.includes("rejected")) {
            color = "volcano";
            icon = <MinusCircleOutlined />;
          }
          if (tag.includes("approved")) {
            color = "green";
            icon = <CheckCircleOutlined />;
          }
          if (tag.includes("submitted")) {
            color = "blue";
            icon = <CheckCircleOutlined />;
          }

          return (
            <Tag color={color} icon={icon} key={tag} id="tag">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </div>
    ),
  },
];

const Empbookings = ({ perm }) => {
  const updateBooking = (record, val) => {
    console.log(record.id, val);
    console.log(document.getElementById(`${record.id}_input`).value);
    console.log(document.getElementById(`${record.id}_select`).value);
    console.log(val);
    axios({
      method: "PUT",
      url: baseURL + "/hall/book/",
      data: {
        remarks: document.getElementById(`${record.id}_input`).value,
        rejected: val,
        id: record.id,
        hall: document.getElementById(`${record.id}_select`).value,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then(() => {
      message.success("Request Processed Successfully");
      getList();
    });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOld, setIsOld] = useState(false);

  const getList = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: baseURL + "/hall/book/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then((response) => {
      console.log(response.data);
      setLoading(false);
      setData(response.data);
    });
  };

  const oldBookings = () => {
    setLoading(true);
    setIsOld(true);
    axios({
      method: "GET",
      url: baseURL + "/hall/book/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      params: {
        old: 1,
      },
    }).then((response) => {
      console.log(response.data);
      setLoading(false);
      setData(response.data);
    });
  };

  useEffect(() => {
    if (isOld) {
      oldBookings();
    } else {
      getList();
    }
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Row>
        <Col span={20}></Col>
        <Col span={3} style={{ display: perm.isUpdatable ? "none" : "block" }}>
          {!isOld && <Button onClick={oldBookings}>View Old Bookings</Button>}
          {isOld && (
            <Button
              type="primary"
              onClick={() => {
                setIsOld(false);
                getList();
              }}
            >
              View New Bookings
            </Button>
          )}
        </Col>
        <Col span={1}></Col>
      </Row>
      <Table
        rowKey="id"
        style={{ marginTop: "1rem" }}
        columns={columns}
        dataSource={data}
        expandable={{
          onExpand: (expanded, record) => {
            if (expanded === true && perm.isUpdatable) {
              axios({
                method: "GET",
                url: baseURL + "/hall/list/",
                params: {
                  start: record.start,
                  end: record.end,
                  occupancy: record.occupancy,
                  include_images: "False",
                },
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access"),
                },
              }).then((response) => {
                console.log(response.data);
                let hallList = document.getElementById(`${record.id}_select`);
                hallList.innerHTML = `<option selected value=${record.id}
                )>Keep Default ( ${record.hall_name} )</option>`;
                response.data.map((item) => {
                  hallList.innerHTML += `<option value=${item.id} >${item.name}</option>`;
                });
                // console.log(response.data);
              });
            }
          },
          expandedRowRender: (record, index) => {
            return (
              <div style={{ margin: 0 }}>
                <Row>
                  {record.remarks.map((remark, index) => {
                    return (
                      <Tag
                        color="cyan"
                        key={index}
                        style={{ borderRadius: "0.3rem" }}
                      >
                        {remark}
                      </Tag>
                    );
                  })}
                </Row>
                <div style={{ display: perm.isUpdatable ? "block" : "none" }}>
                  <br />

                  <Row>
                    <Col span={3}>
                      <span style={{ fontSize: "1.1rem" }}>Remarks :</span>
                    </Col>
                    <Col span={8}>
                      <Input
                        placeholder="Enter Remarks"
                        id={`${record.id}_input`}
                      />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6}>
                      <select
                        name=""
                        id={`${record.id}_select`}
                        disabled={!perm.isEditable}
                        style={{
                          height: "2.1em",
                          width: "13rem",
                          backgroundColor: "white",
                        }}
                      ></select>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                      <Button
                        htmlType="submit"
                        // primary
                        onClick={() => {
                          updateBooking(record, false);
                        }}
                      >
                        Approve
                      </Button>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                      <Button
                        danger
                        htmlType="submit"
                        // primary
                        onClick={() => {
                          updateBooking(record, true);
                        }}
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          },
          // rowExpandable: () => {
          //   return true;
          // },
          expandRowByClick: true,
        }}
      />
    </>
  );
};

Empbookings.defaultProps = {
  perm: {
    isUpdatable: false,
    isEditable: false,
  },
};

export default Empbookings;
