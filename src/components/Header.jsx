import React from "react";
import styled from "styled-components";

// elements
import { GlobalStyle } from "../elements";
import { Grid } from "../elements";

const Header = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <HeaderWrap>
        <Logo>MOHA</Logo>
        <Cat>
          <button>서울</button>
          <button>경기</button>
          <button>강원</button>
          <button>충북</button>
          <button>충남</button>
          <button>전북</button>
          <button>전남</button>
          <button>경북</button>
          <button>경남</button>
          <button>제주</button>
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
  top: 0;
  border: 1px solid #000;
`;

const Logo = styled.div``;

const Cat = styled.div``;
