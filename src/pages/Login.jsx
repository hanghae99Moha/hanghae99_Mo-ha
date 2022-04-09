import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { Grid, Button, Input } from "../elements";

const Login = () => {
  console.log(getCookie("password"));
  const login = () => {
    setCookie("userId", "sangwon", 3);
    setCookie("password", "1242", 3);
  };
  const history = useHistory();

  return (
    <Contain>
      <Namebox>Mo-ha</Namebox>
      <input placeholder="아이디" />
      <input placeholder="비밀번호" />
      <button
        onClick={() => {
          login();
        }}
      >
        로그인
      </button>
      <span>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
      </span>
      <div>
        <button>카카오 로그인</button>
        <button>페이스북 로그인</button>
        <button>네이버 로그인</button>
      </div>
    </Contain>
  );
};

export default Login;

const Contain = styled.div`
  border: 1px solid gray;
  margin: auto;
  width: 300px;
  height: 400px;
  padding: 100px;
`;

const Namebox = styled.div`
  border: 1px solid gray;
  margin: auto;
`;
