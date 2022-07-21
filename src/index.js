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
    const originalrequest = error.config;
    if (error.response.status == 403) {
      Swal.fire({
        icon: "error",
        title: "Permission not Granted",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.href =
          "https://hall-booking-module-nine.vercel.app/login";
      }, 2000);
    }
    if (error.response.status == 400) {
      Swal.fire({
        icon: "error",
        title: "Bad Request",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (error.response.status == 500) {
      Swal.fire({
        icon: "warning",
        title: "Internal Server Error",
      });
    }
    if (
      error.response.status == 401 &&
      error.response.data.detail == "Given token not valid for any token type"
    ) {
      return axios({
        method: "POST",
        url: baseURL + "/account/refresh_token/",
        data: {
          refresh: localStorage.getItem("refresh"),
        },
      })
        .then((response) => {
          const access = response.data.access;
          const refresh = response.data.refresh;
          localStorage.setItem("access", access);
          localStorage.setItem("refresh", refresh);
          originalrequest.headers.Authorization =
            "Bearer " + localStorage.getItem("access");
          return axios(originalrequest);
        })
        .catch((err) => {
          if (err.response.data.detail == "Token is invalid or expired") {
            axios({
              method: "POST",
              url: baseURL + "/account/logout/",
              data: {
                refresh: localStorage.getItem("refresh"),
              },
            }).then(() => {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              Swal.fire({
                icon: "warning",
                title: "Session Timed Out !",
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                window.location.href =
                  "https://hall-booking-module-nine.vercel.app/login";
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
