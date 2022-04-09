import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";

// Logo
import LogoImg from "../assets/Logo.png";

// elements
import { GlobalStyle } from "../elements";
import { Button, Grid } from "../elements";

// react-icons
import { BsPencil, BsFileEarmarkPost } from "react-icons/bs";
import { GoHome } from "react-icons/go";

const Sidebar = () => {
  const [nickname, setNicname] = useState({
    nickname: "르탄이",
  });

  return (
    <React.Fragment>
      <GlobalStyle />
      <SidebarPosition>
        <Grid>
          <Top>
            <Logo />
            <Button>로그아웃</Button>
          </Top>
        </Grid>
        <Grid>
          <Greeting>
            {nickname.nickname}님,
            <br /> 안녕하세요.
          </Greeting>
        </Grid>
        <Grid display="flex">
          <Bottom>
            <BsPencil
              style={{
                cursor: "pointer",
              }}
              onClick={() => {}}
            />
            <BsFileEarmarkPost
              style={{
                cursor: "pointer",
              }}
              onClick={() => {}}
            />
            <GoHome
              style={{
                cursor: "pointer",
              }}
              onClick={() => {}}
            />
          </Bottom>
        </Grid>
      </SidebarPosition>
    </React.Fragment>
  );
};

export default Sidebar;

const SidebarPosition = styled.div`
  height: 100vh;
  width: 350px;
  box-sizing: border-box;
  background-color: var(--color-main);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 20px auto;
`;

const Logo = styled.div`
  background-image: url(${LogoImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 80px;
  height: 80px;
`;

const Greeting = styled.h1`
  color: #333;
  text-align: center;
`;

const Bottom = styled.div`
  width: 100%;
  font-size: 34px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
