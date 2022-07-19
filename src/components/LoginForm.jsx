import React from "react";
import loginImg from "../loginimg.png";

const LoginForm = ({ setUsername, setPassword, doLogin }) => {
  return (
    <section className="text-gray-600 body-font">
      <div
        className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"
        style={{ marginTop: "3rem" }}
      >
        <div
          className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"
          style={{ marginTop: "-1.5rem" }}
        >
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={loginImg}
          />
        </div>
        <div
          className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
          style={{ marginTop: "-4.5rem" }}
        >
          <h1
            className="title-font sm:text-7xl text-3xl mb-4 font-medium text-gray-900"
            style={{
              marginBottom: "2rem",
              marginTop: "3rem",
              color: "#2f2e41",
            }}
          >
            Login.
          </h1>

          <form onSubmit={doLogin}>
            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-3/4 w-2/4">
                <label
                  htmlFor="username"
                  className="leading-7 text-xl text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="leading-7 text-xl text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="hero-field"
                  name="hero-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
              style={{ marginTop: "2rem" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
