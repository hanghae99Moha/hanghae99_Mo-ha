import React, { useState } from "react";
import styled from "styled-components";
import { getCookie, deleteCookie } from "../shared/Cookie";

// page

const Main = (props) => {
  const [is_login, setIsLogin] = useState(false);

  React.useEffect(() => {
    let cookie = getCookie("userid");
    console.log(cookie);

    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

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
