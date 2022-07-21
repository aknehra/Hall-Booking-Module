import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access")) {
      return;
    } else {
      nav("dashboard/*");
    }
  }, []);
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;

<Link to={"/login"} className="underline" style={{ color: "red" }}></Link>;
