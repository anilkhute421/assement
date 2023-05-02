import React from "react";
import styled from "styled-components";
import { NavLink , useLocation  } from "react-router-dom";
// import { activeLink } from "../style/global_syle";
// import IntlMassage from "../utils/IntlMassage";
// import { GlobalStyle } from "../style/global_syle";
import '../style/globalStyle.css';
// import '../style/'


export default function Sidebar() {
  const location = useLocation();
  console.log(location , 'location');
  const Sidebar = [
    {
      path: "Dashbord",
      icon: "icon-Vector",
      name: "Dashbord",
      fontSize: "20px",
    },
    {
      path: "Project",
      icon: "icon-report",
      name: "Project",
      fontSize: "20px",
    },
    {
      path: "Reporting",
      icon: "icon-Vector-1",
      name: "Reporting",
      fontSize: "20px",
    },
    {
      path: "Employee",
      icon: "icon-Vector-2",
      name: "Employee",
      fontSize: "15px",
    },
    {
      path: "Lms",
      icon: "icon-Vector-2",
      name: "Lms",
      fontSize: "15px",
    },
  ];

  const SidebarSecond = [
    {
      path: "Notifications",
      icon: "icon-Vector-3",
      name: "Notifications",
      fontSize: "20px",
    },
    {
      path: "Setting",
      icon: "icon-Vector-4",
      name: "Settings",
      fontSize: "20px",
    },
  ];

  return (
    <SidebarContainer>
      <SidebarValue>
        <div style={{ margin: "30px 0px 30px 0px" }}>
          {Sidebar.map((value, index) => {
            return (
              <SidebarMenuItem>
                <NavLink to={value.path}  exact>  
                  <NavIcon style={{ fontSize: value.fontSize }} className={location.pathname === `/Dashbord/${value.path}` ? "activenew" : ""}>
                    <i className={`${value.icon}`} />
                  </NavIcon>
                  <SidebarMenuItemLabel className={location.pathname === `/Dashbord/${value.path}` ? "stylecolor" : ""}>
                    {/* <IntlMassage id="sidebar.dashboard" /> */}
                    {value.name}
                  </SidebarMenuItemLabel>
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </div>
      </SidebarValue>

      <SidebarSecondValue>
        {SidebarSecond.map((value, index) => {
          return (
            <SidebarMenuItem>
              <NavLink to={value.path} activeClassName="activeLink" exact>
                <NavIcon style={{ fontSize: value.fontSize }} className={location.pathname === `/Dashbord/${value.path}` ? "activenew" : ""}>
                  <i className={value.icon} />
                </NavIcon>
                <SidebarMenuItemLabel>
                  {/* <IntlMassage id="sidebar.dashboard" /> */}
                  {value.name}
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          );
        })}
      </SidebarSecondValue>
    </SidebarContainer>
  );
}

export const SidebarContainer = styled.form`
  height: 100vh;
  min-height: 550px;
  width: 192px;
  background-color: #252529;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  color: #000;
  // position: fixed;
  left: ${({ dir }) => dir === "ltr" && "0"};

  right: ${({ dir }) => dir === "rtl" && "0"};
  transition: all ease-out 0.4s;
  @media screen and (max-width: 991px) {
    // position: fixed;
    z-index: 10;
    left: ${({ dir, open }) => dir === "ltr" && !open && "-100%"};
    left: ${({ dir, open }) => dir === "ltr" && open && "0"};
    right: ${({ dir, open }) => dir === "rtl" && !open && "-100%"};
    right: ${({ dir, open }) => dir === "rtl" && open && "0"};
  }

  background: #ffffff;
`;



export const SidebarValue = styled.form`
  position: absolute; 
  top: 85px;

  // /* light-bg */

  border: 2px solid #f7f7fa;
  // box-shadow: 0px 0px 0px 10px  rgba(0, 0, 0, 0.25);

  // display: flex;
  align-items: center;
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;
const SidebarMenuItem = styled.li`
  display: flex;
  height: 40px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 15px;
  a {
    width: 0.5%;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    // border-radius: 10px;
    // transform: matrix(1, 0.01, 0, 1, 0, 0);
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;

    height: 40px;
    text-decoration: none;
    &:hover {
      // background: rgb(0, 0, 233);
    }
  }
  .activeLink {
    background: #145da0;
    color: #ffffff;
    &:hover {
      // background: #145da0;
      // color: #ffffff;
    }
  }
`;

const NavIcon = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  line-height: 17px;

  i{
    color: ${({ style_color }) => style_color === true ? "rgb(0, 0, 233)" : "" };
  }
`;

const SidebarMenuItemLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  padding: 15px 0px;
  margin: 0;
  // color: #7b7f91;
  font-family: "Poppins";
  font-style: normal;

  &:hover {
    // color: #242424;
  }
`;

export const SidebarSecondValue = styled.form`
  position: absolute;
  // width: 192px;
  // height: 0px;
  // left: 0px;
  top: 420px;

  // /* light-bg */

  // border: 1px solid #F7F7FA;

  // display: flex;
  align-items: center;
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;

// export const activeLink={
//   color:'red',
//   background:"black"
// };