import React, { useState } from "react";
import styled from "styled-components";
import NavbarButton from "../components/NavbarButton";
import LogoSrc from "../assets/sfs_logo.svg";
import { color } from "../style/color";
import Avatar from "../assets/avatar.svg";
import { logoutIcon } from "../utils/image";

export default function Navbar() {
  const [logout, setLogout] = useState(false);

  return (
    <NavbarContainer>
      <WebName src={LogoSrc} />
      <NavbarButton />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Searchbar>
          <input type="text" placeholder="Search..." />
          <SearchIcon>
            <i className="icon-search" />
          </SearchIcon>
        </Searchbar>
        <ManinWrapper>
          <BellIcon>
            <i className="icon-Vector-3" />
          </BellIcon>
          <Profile>
            <ProImg src={Avatar} />
            <ProfileName>
              Clayton Santos
              <UserType>
                <p>Client</p>
              </UserType>
            </ProfileName>
            <UserLogout src={logoutIcon} onClick={() => setLogout(!logout)} />
          </Profile>
          {logout ? (
            <LogoutButton>
              <LogoutName style={{ color: "white" }}>Logout</LogoutName>
            </LogoutButton>
          ) : (
            ""
          )}
        </ManinWrapper>
      </div>
    </NavbarContainer>
  );
}

const NavIcon = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  line-height: 17px;

  i:hover {
    color: rgb(0, 0, 233);
  }
`;

export const NavbarContainer = styled.form`
  width: 100%;
  height: 84px;
  top: 0px;

  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
  color: #000;
  position: fixed;
  left: ${({ dir }) => dir === "ltr" && "0"};

  right: ${({ dir }) => dir === "rtl" && "0"};
  transition: all ease-out 0.4s;
  @media screen and (max-width: 991px) {
    position: fixed;
    z-index: 10;
    left: ${({ dir, open }) => dir === "ltr" && !open && "-100%"};
    left: ${({ dir, open }) => dir === "ltr" && open && "0"};
    right: ${({ dir, open }) => dir === "rtl" && !open && "-100%"};
    right: ${({ dir, open }) => dir === "rtl" && open && "0"};
  }
  background: #ffffff;
  z-index: 99999;
`;

export const WebName = styled.img`
  width: 135px;
  height: 26px;
  margin: 30px 26px;
`;

export const Searchbar = styled.div`
  padding: 5px 10px 5px 55px;
  position: relative;
  width: 298px;
  height: 40px;
  // left: 235px;
  // top: 22px;
  background: ${color.Grey};
  border-radius: 6px;
  border: none;
  margin: 24px 0px 0px 30px;

  input {
    background: ${color.Grey};
    border: none;
    // padding:4px 3px;
    width: 240px;
    margin-top: 8px;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 8%;
  // right: 23.17%;
  top: 13px;
  // bottom: 23.14%;
  width: 20px;
`;

export const ManinWrapper = styled.div`
  position: relative;
  display: flex;
  width: 248px;
  // height:44px;
  // float:left;
  // border:1px solid red;
`;

export const BellIcon = styled.div`
  width: 44px;
  height: 44px;

  background: #f7f7fa;
  border-radius: 40px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  position: relative;
  top: 20px;

  i {
    position: absolute;
    left: 30.33%;
    right: 26.1%;
    top: 30%;
    bottom: 18.33%;
  }
`;

export const Profile = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;
  // align-items: center;
  padding: 4px;
  gap: 4px;

  width: 184px;
  height: 44px;

  background: #f7f7fa;
  border-radius: 40px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 20px 15px;
`;

const ProImg = styled.img`
  width: 36px;
  height: 36px;

  background: url(.jpg), #d9d9d9;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  border-radius: 40px;
`;

const ProfileName = styled.label`
  width: 92px;
  height: 20px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  color: #242424;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
  white-space: nowrap;
`;

const UserType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 6px;
  gap: 10px;

  width: 45px;
  height: 14px;

  background: #489f80;
  border-radius: 26px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;

  p {
    width: 29px;
    height: 14px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height, or 140% */

    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const UserLogout = styled.img`
  width: 15px;
  height: 14px;
  margin-top: 10px;
`;

const LogoutButton = styled.div`
  position: absolute;
  // display:block;
  width: 184px;
  height: 44px;
  cursor: pointer;
  background: #489f80;
  border-radius: 40px;

  /* Inside auto layout */

  left: 60px;
  // right:1px;
  top: 75px;
`;

const LogoutName = styled.p`
  color: white;
  text-align: center;
  // width
  // width: 92px;
  // height: 20px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  margin: 10px;
`;
