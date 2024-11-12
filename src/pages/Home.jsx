import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import AboutUs from "../components/AboutUs";
import Reasons from "../components/Reasons";
import Footer from "../components/Footer";
import Causes from "../components/Causes";

export default function Home() {
  return (
    <div>
      <header className="main-header">
        <nav className="navbar navbar-static-top">
          <Topbar />
          <Navbar />
        </nav>
      </header>
        <Carousel/>
        <AboutUs/>
        <Reasons/>
        <Causes/>

        <Footer/>
    </div>
  );
}
