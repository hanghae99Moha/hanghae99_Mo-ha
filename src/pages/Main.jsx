import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// components
import Postlist from "../components/Postlist";
import ResponsiveSlider from "../components/Slider";

import { history } from "../redux/configureStore";
import { actionCreators } from "../redux/modules/post";

const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const is_token = useSelector((state) => state.user.token);
  const __token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, []);

  if (!__token) {
    return (
      <LodingScrn>
        <p>잠깐,</p>
        <p> 로그인 이후 이용이 가능합니다.</p>
        <button
          onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </button>
      </LodingScrn>
    );
  }
  return (
    <StMain>
      <ResponsiveSlider />
      <Postlist />
    </StMain>
  );
};

export default Main;

const StMain = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const LodingScrn = styled.div`
  color: #bbb;
  font-size: 30px;
  width: 100%;
  height: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
