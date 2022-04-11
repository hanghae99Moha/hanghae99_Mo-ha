import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";

// page

const Main = (props) => {
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) {
    return <StMain>Main</StMain>;
  }
};

export default Main;

const StMain = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
