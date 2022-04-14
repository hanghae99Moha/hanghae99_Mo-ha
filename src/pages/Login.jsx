import React from "react";

import styled from "styled-components";
import LogoImg from "../assets/Logo.png";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userId, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const handleIdInput = (e) => {};
  // const handlePaswordInput = (e) => {
  //   setPassword(e.target.value);
  // };
  const handlelogin = () => {
    if (userId === "" || password === "") {
      window.alert("아이디 혹은 비밀번호가 입력되지 않았습니다.");
      return;
    }
    dispatch(userActions.loginAction(userId, password));
  };

  return (
    <Contain>
      <Stbox>
        <Namebox>
          <Logo />
        </Namebox>
        <Stinput
          placeholder="아이디"
          type="text"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Stinput
          placeholder="비밀번호"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <StBtnIcon>
          <StBtn
            type="submit"
            onClick={handlelogin}
            // onClick={() => {
            //   login();
            // }}
          >
            로그인
          </StBtn>
          <span>
            <StBtn
              onClick={() => {
                localStorage.setItem("sss", "ssss");
                history.push("/signup");
              }}
            >
              회원가입
            </StBtn>
          </span>
        </StBtnIcon>
        <StBtnIcon2>
          <Stsublogin style={{ color: "#f89b00" }}>카카오 로그인</Stsublogin>
          <Stsublogin style={{ color: "#00498c" }}>페이스북 로그인</Stsublogin>
          <Stsublogin style={{ color: "#a0e817" }}>네이버 로그인</Stsublogin>
        </StBtnIcon2>
      </Stbox>
    </Contain>
  );
};

export default Login;

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
  justify-content: center;
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

const Stbox = styled.div``;

const Namebox = styled.div`
  margin: auto;
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

const StBtnIcon = styled.div`
  align-items: center;
  margin: 10px;
  width: 500px;
`;
const StBtnIcon2 = styled.div`
  margin: -10px;
  margin-left: -15px;
  width: 500px;
`;

const StBtn = styled.button`
  width: 180px;
  height: 31px;
  margin: 10px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: white;
  font-size: 1.2em;
  letter-spacing: 4px;
`;

const Stsublogin = styled.button`
  width: 140px;
  height: 31px;
  margin: 10px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: white;
  font-size: auto;
  letter-spacing: 2px;
`;
