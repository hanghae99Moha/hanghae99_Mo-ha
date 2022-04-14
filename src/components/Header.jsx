import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// elements
import { GlobalStyle } from "../elements";

const Header = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <HeaderWrap>
        <Logo
          onClick={() => {
            history.push("/main");
          }}
        >
          Mo-ha
        </Logo>
        <Cat>
          <StBtn onClick={() => {}}>서울</StBtn>
          <StBtn onClick={() => {}}>경기</StBtn>
          <StBtn onClick={() => {}}>강원</StBtn>
          <StBtn onClick={() => {}}>충북</StBtn>
          <StBtn onClick={() => {}}>충남</StBtn>
          <StBtn onClick={() => {}}>전북</StBtn>
          <StBtn onClick={() => {}}>전남</StBtn>
          <StBtn onClick={() => {}}>경북</StBtn>
          <StBtn onClick={() => {}}>경남</StBtn>
          <StBtn onClick={() => {}}>제주</StBtn>
        </Cat>
      </HeaderWrap>
    </React.Fragment>
  );
};

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  position: sticky;
  background-color: #fff;
  top: 0;
  z-index: 999;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const Cat = styled.div``;

const StBtn = styled.button`
  margin: 20px 10px;
  border: 2px solid transparent;
  background-color: #fff;
  width: 50px;
  color: #aaa;
  box-sizing: border-box;
  transition: ease-in-out 0.2s;

  &:hover {
    border-bottom: 1px solid var(--color-main);
    color: #000;
    cursor: pointer;
  }
`;
