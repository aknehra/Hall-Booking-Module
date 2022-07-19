import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import baseURL from "./baseURL";
import axios from "axios";
import Swal from "sweetalert2";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.config);
    console.log(error.response.data);
    const originalrequest = error.config;
    console.log(error.response.status);
    if (
      error.response.status == 401 &&
      error.response.data.detail == "Given token not valid for any token type"
    ) {
      console.log("ugewwehx");
      return axios({
        method: "POST",
        url: baseURL + "/account/refresh_token/",
        data: {
          refresh: localStorage.getItem("refresh"),
        },
      })
        .then((response) => {
          console.log(response.data);
          console.log("qwertyuiopasdfghjkl");
          const access = response.data.access;
          const refresh = response.data.refresh;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);
          originalrequest.headers.Authorization =
            "Bearer " + localStorage.getItem("access");
          console.log(originalrequest.headers.Authorization);
          return axios(originalrequest);
        })
        .catch((err) => {
          console.log("hgfdsdfghgfdfghjhgfffffffffffffffffffffff");
          console.log(err.response.data.detail);
          if (err.response.data.detail == "Token is invalid or expired") {
            axios({
              method: "POST",
              url: baseURL + "/account/logout/",
              data: {
                refresh: localStorage.getItem("refresh"),
              },
            }).then(() => {
              Swal.fire({
                // position: "top-end",
                icon: "warning",
                title: "Session Timed Out !",
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                window.location.href = "http://localhost:3000/login";
              }, 2000);
            });
            return;
          }
        });
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
