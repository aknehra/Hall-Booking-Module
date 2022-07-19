import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../baseURL";

const Profile = () => {
  const [profile, setProfile] = useState("");
  useEffect(() => {
    axios({
      method: "GET",
      url: baseURL + "/account/profile/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    }).then((response) => {
      console.log(response.data);
      setProfile(response.data);
    });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div
        className="container px-5 py-24 mx-auto flex flex-col"
        style={{ paddingTop: "4rem", paddingBottom: "2rem" }}
      >
        <div className="lg:w-4/6 mx-auto">
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2
                  className="font-medium title-font mt-4 text-gray-900 text-lg"
                  style={{ fontSize: "1.5rem" }}
                >
                  {profile.first_name} {profile.last_name}
                </h2>
                <div className="w-12 h-1 bg-blue-500 rounded mt-2 mb-4"></div>
                <p className="text-base">{profile.role}</p>
              </div>
            </div>
            <div
              className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="leading-relaxed text-lg mb-4">
                <ul>
                  <li>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>Username :</b>&nbsp;&nbsp;{profile.username}
                  </li>
                  <li>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>Email :</b>&nbsp;&nbsp;{profile.email}
                  </li>
                  <li>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <b>Date of Joining :</b>&nbsp;&nbsp;
                    {new Date(profile.date_joined).toLocaleDateString()}
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
