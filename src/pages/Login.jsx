import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../baseURL";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Swal from "sweetalert2";
import { message } from "antd";
import Loader from "../components/Loader";

const Login = () => {
  useEffect(() => {
    if (!localStorage.getItem("access")) {
      return;
    } else {
      nav("dashboard/*");
    }
  });
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const doLogin = (e) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      Swal.fire("Enter the Credentials");
      return;
    } else {
      setLoading(true);
      axios({
        method: "POST",
        url: baseURL + "/account/login/",
        data: {
          email: username,
          password: password,
        },
      })
        .then((response) => {
          setLoading(false);
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
    }
  };

  return loading ? (
    <Loader />
  ) : (
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
