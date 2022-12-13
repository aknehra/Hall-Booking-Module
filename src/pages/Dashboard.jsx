import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import components from "../components/DynamicComponents";
import "./Dashboard.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button } from "antd";
import { IoLogoBuffer } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import baseURL from "../baseURL";
import Loader from "../components/Loader";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [leftPanel, setLeftPanel] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      axios({
        method: "GET",
        url: baseURL + "/account/dashboard/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      }).then((response) => {
        setLoading(false);
        setLeftPanel(response.data);
        generateLeftPanel(response.data);
      });
    } else {
      nav("/");
    }
  }, []);

  const dynoCompo = (name, props) => {
    const DynamicComponent = components[name];
    return <DynamicComponent {...props} />;
  };

  const generateLeftPanel = (data) => {
    let leftItem = [];
    data.map((item, index) => {
      return leftItem.push({
        key: index + 1,
        icon: dynoCompo(item.icon, {}),
        label: (
          <Link to={item.route} style={{ fontSize: "1rem" }}>
            {item.text}
          </Link>
        ),
      });
    });
    setItems(leftItem);
  };

  const [collapsed, setCollapsed] = useState(false);

  const nav = useNavigate();

  const logout = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: baseURL + "/account/logout/",
      data: {
        refresh: localStorage.getItem("refresh"),
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      const success = () => {
        message.success("Logged Out Successfully");
      };
      setLoading(false);
      success();
      loading ? <Loader /> : nav("/");
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              color: "white",
              height: "3.66rem",
              fontSize: "2rem",
              marginTop: "1rem",
            }}
          >
            <center>
              <IoLogoBuffer />
            </center>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ marginTop: "2.5rem" }}
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="siteee-layout-background"
            style={{
              paddingLeft: 10,
              background: "white",
            }}
          >
            <Row>
              <Col span={1}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Col>
              <Col span={21}></Col>
              <Col span={2}>
                <Button onClick={logout} danger>
                  Log Out
                </Button>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              height: "33.35rem",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            <Routes>
              {leftPanel.map((item, index) => {
                return (
                  <Route
                    path={item.route}
                    element={dynoCompo(item.component, item.props)}
                    key={index}
                  />
                );
              })}
              <Route path="*" element={<Navigate to={""} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
