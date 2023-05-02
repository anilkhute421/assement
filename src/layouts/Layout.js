import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SideBarButton } from "../components/NavbarButton";
import styled from "styled-components";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{display:"flex" , flexDirection:"coloum"}}>

      <Sidebar />
      <Outlet />

      </div>
    </>
  );
}
