import React from "react";
import { Grid, Button, Input } from "../elements";

const Login = () => {
  return (
    <>
      <div>Mo-ha</div>
      <input placeholder="아이디" />
      <input placeholder="비밀번호" />
      <button>로그인</button>
      <span>
        <button>회원가입</button>
      </span>
      <div>
        <button>카카오 로그인</button>
        <button>페이스북 로그인</button>
        <button>네이버 로그인</button>
      </div>
    </>
  );
};

export default Login;
