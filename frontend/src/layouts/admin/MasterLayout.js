import React from "react";

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import Sidebar from "./Sidebar";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function MasterLayout() {
  return (
    <div className="sb-nav-fixed">
      <NavBar />

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
             <Sidebar />
        </div>
        <div id="layoutSidenav_content">
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>

      </div>
    </div>
  );
}

export default MasterLayout;
