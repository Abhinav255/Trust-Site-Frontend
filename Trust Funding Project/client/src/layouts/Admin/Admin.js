import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import EditTrustee from "views/EditTrustees";
import Login from "views/Login";
import EditDonor from "views/EditDonor";
import DonorView from "views/DonorView";
import AddContribution from "views/AddContribution";

let ps;

function Admin() {
  const location = useLocation();
  const mainPanelRef = useRef(null);
  const [sidebarOpened, setSidebarOpened] = useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // Redirect to login if not authenticated
      window.location.href = "/admin/login";
    }

    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.classList.add("perfect-scrollbar-on");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      document.querySelectorAll(".table-responsive").forEach((table) => {
        ps = new PerfectScrollbar(table);
      });
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return <Route path={prop.path} element={prop.component} key={key} />;
      }
      return null;
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin/login";
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <div className="wrapper">
          <Sidebar
            routes={routes}
            logo={{
              outterLink: "",
              text: "Creative Tim",
              imgSrc: logo,
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
              handleLogout={handleLogout}
            />
            <Routes>
              {getRoutes(routes)}
              <Route path="/admin/dashboard" element={<Admin/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/trustee/edit/:id" element={<EditTrustee/>} />
              <Route path="/donor/edit/:id" element={<EditDonor/>} />
              <Route path="/donor/donor-view/:id" element={<DonorView/>} />
              <Route path="/donor/add-contribution/:id" element={<AddContribution/>} />
            </Routes>
            {location.pathname !== "/admin/maps" && <Footer fluid />}
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
