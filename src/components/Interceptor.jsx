import axios from "axios";
import baseURL from "../baseURL";

const Interceptor = () => {
  return axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status == 403) {
        Swal.fire({
          icon: "error",
          title: "Permission not Granted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (error.response.status == 400) {
        Swal.fire({
          icon: "error",
          title: error.response.data.detail,
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
      if (error.response.status == 401) {
        axios({
          method: "POST",
          url: baseURL + "/account/verify/",
          data: {
            token: localStorage.getItem("refresh"),
          },
        })
          .then((response) => {
            if (response.status == 200) {
              axios({
                method: "POST",
                url: baseURL + "/account/refresh_token/",
                data: {
                  refresh: localStorage.getItem("refresh"),
                },
              })
                .then((response) => {
                  if (response.status == 200) {
                    console.log(response.data);
                  }
                })
                .catch(() => {
                  alert("Looged Out !");
                });
            }
          })
          .catch(() => {
            alert("Logged Out");
          });
      }
      return Promise.reject(error);
    }
  );
};

export default Interceptor;
