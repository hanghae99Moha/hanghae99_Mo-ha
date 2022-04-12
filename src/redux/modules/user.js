import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

import api from "../../api/api";
import { getToken, setToken, delToken } from "../../shared/token";

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
      .post("api/login", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("name", response.data.email); // email => userId로 변경 ( api 명세서 )
        localStorage.setItem("token", response.data.token);
        dispatch(logIn(response.data.userId));
        history.replace("/main");

        console.log("로그인이 되었어요");
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디와 비밀번호가 일치하지 않습니다.");
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
    await api
      .post("api/signup", userInfo)
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
        setCookie("is_login", "success");
        draft.userId = action.payload.userId;
        console.log(action);
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.userId = null;
        draft.is_login = false;
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
  loginAction,
  signupAction,
};

export { actionCreators };
