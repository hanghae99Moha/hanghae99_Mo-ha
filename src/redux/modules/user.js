import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../api/api";
import { getToken, setToken, delToken } from "../../shared/token";
import axios from "axios";

// ACTIONS
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// ACTION CREATORS
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  is_login: false,
  userId: null,
  nickname: null,
};

// middleware actions
const loginAction = (userId, password) => {
  return function (dispatch, getState, { history }) {
    const data = {
      userId: userId,
      password: password,
    };
    console.log(data);
    api
      .post("/api/login", data)
      .then((response) => {
        if (response.data.token) {
          console.log(response);
          localStorage.setItem("name", response.data.userId); // email => userId로 변경 ( api 명세서 )
          localStorage.setItem("token", response.data.token);
          dispatch(logIn(response.data.userId));
          localStorage.setItem("nickname", response.data.nickname);
          history.replace("/main");

          console.log("로그인이 되었어요");
          window.alert("로그인 성공!!😊");
        } else {
          window.alert("아이디 비밀번호를 확인해 주세요!!😲");
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디와 비밀번호가 일치하지 않습니다.");
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그인여부 확인");

    const token = localStorage.getItem("user_token");
    api
      .get("/api/idlogin", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        const is_login = true;
        const userId = response.data.userInfo.userId;
        localStorage.setItem("userId", userId);

        dispatch(logIn(is_login, userId));
      })
      .catch((err) => {
        console.log("로그인 여부 확인 실패", err);
      });
  };
};

const signupAction = (userId, password, nickname) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = {
      userId: userId,
      password: password,
      nickname: nickname,
    };
    console.log("회원가입하는중");
    window.alert("회원가입이 되었습니다. 환영합니다.!!");
    await api
      .post("/api/signup", userInfo)
      .then(function (response) {
        console.log(response);
        history.push("/");
      })
      .catch((err) => {
        window.alert("회원가입에 실패했습니다.");
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = action.payload.userId;
        console.log(action);
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        window.location.replace("/");
        console.log("로그아웃 합니다.");
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  logOut,
  getUser,
  loginCheckFB,
  loginAction,
  signupAction,
};

export { actionCreators };
