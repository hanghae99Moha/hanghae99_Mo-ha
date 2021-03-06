import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import LogoImg from "../assets/Logo.png";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    userId: "",
    password: "",
    nickname: "",
    passwordConfirm: "",
  });
  const [valid, setValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const specialLetter = values.userId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  const Idhandle = (e) => {
    setValues({ ...values, userId: e.target.value });
  };
  const Pwhandle = (e) => {
    setValues({ ...values, password: e.target.value });
  };
  const PwConfirmhandle = (e) => {
    setValues({ ...values, passwordConfirm: e.target.value });
  };
  const Nicknamehandle = (e) => {
    setValues({ ...values, nickname: e.target.value });
  };

  const handleSpecialLetter = (e) => {
    setValues({ ...values, specialLetter: e.target.value });
  };
  const Submithandle = (e) => {
    // e.preventDefault();
    if (
      values.userId &&
      values.password &&
      values.nickname &&
      values.passwordConfirm
    ) {
      setValid(true);
    }
    if (
      values.userId === "" ||
      values.password === "" ||
      values.nickname === "" ||
      values.passwordConfirm === ""
    ) {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!!😊");
      return;
    }
    if (values.password !== values.passwordConfirm) {
      window.alert("앗! 비밀번호가 일치하지 않아요! 😅");
      return;
    }
    if (values.userId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) !== -1) {
      window.alert("ID에 특수 문자는 안돼요!😅");
      return;
    }
    setSubmitted(true);
    dispatch(
      userActions.signupAction(values.userId, values.password, values.nickname)
    );
  };

  return (
    <Contain>
      <Logo />
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Stid>
          <Stinput
            placeholder="아이디"
            name="userId"
            minlength="6"
            value={values.userId}
            type="text"
            onChange={Idhandle}
          />
          {submitted && !values.userId ? (
            <p>
              {" "}
              <p style={{ color: "#ff2667" }}>6글자 이상 입력해주세요!!</p>
            </p>
          ) : null}
          <StButton onChange={Submithandle}>중복 확인</StButton>
        </Stid>
        <Stinput placeholder="닉네임" onChange={Nicknamehandle} />
        <Stinput
          placeholder="비밀번호"
          type="Password"
          onChange={Pwhandle}
          value={values.password}
          name="password"
          minlength="6"
        />
        <Stinput
          onChange={PwConfirmhandle}
          value={values.passwordConfirm}
          placeholder="비밀번호 확인"
          type="Password"
          name="passwordConfirm"
          minlength="6"
        />
        {submitted && !values.passwordConfirm ? (
          <p>
            <span style={{ color: "#ff2667" }}>
              6글자 이상 입력해주세요😅❕
            </span>
          </p>
        ) : null}
      </form>
      <Stsublogin type="submit" onClick={Submithandle}>
        회원 가입
      </Stsublogin>
    </Contain>
  );
};

export default Signup;

const Contain = styled.div`
  border: 1px solid gray;
  margin: auto;
  width: 550px;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  background-color: #778f79;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  background-image: url(${LogoImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 80px;
`;

const Stid = styled.div`
  display: flex;
  width: 200;
  align-items: center;
  position: relative;
`;

const StButton = styled.button`
  height: 55px;
  width: 100px;
  margin-top: 10px;
  position: absolute;
  right: 0;
  border-radius: 30px;
  background-color: #bcab93;
  outline: none;
  border: 1px solid lightgray;
`;

const Stinput = styled.input`
  width: 99%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  border: 1px solid lightgray;
  outline: none;
  text-align: center;
`;

const Stsublogin = styled.button`
  width: 140px;
  height: 31px;
  margin: auto;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: white;
  font-size: auto;
  letter-spacing: 2px;
`;
