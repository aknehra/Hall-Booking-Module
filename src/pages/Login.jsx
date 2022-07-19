import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../baseURL";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Swal from "sweetalert2";
import { message } from "antd";

const Login = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const doLogin = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      Swal.fire("Any fool can use a computer");
      return;
    }

    axios({
      method: "POST",
      url: baseURL + "/account/login/",
      data: {
        email: username,
        password: password,
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        const success = () => {
          message.success("Logged in Successfully");
        };
        success();

        nav("/dashboard");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.detail,
        });
      });
  };

  return (
    <div>
      <Header />
      <LoginForm
        setPassword={setPassword}
        setUsername={setUsername}
        doLogin={doLogin}
      />
    </div>
  );
};

export default Login;
