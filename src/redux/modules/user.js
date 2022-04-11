import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie, deleteCookie } from "../../shared/Cookie";

// ACTIONS
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// ACTION CREATORS
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {};

// middleware actions
const loginAction = (userId, password) => {
  return function (dispatch, getState, { history }) {
    const data = {
      userId: userId,
      password: password,
    };
    dispatch(logIn(data.userId));
    history.push("/main");
  };
};
const logoutAction = (userId) => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(logOut(userId));
    history.replace("/");
  };

  //   await api.post('/api/login', data)
  //   .then((response) => {
  //       console.log(response);
  //       if (response.data.token) {
  //           localStorage.setItem('token', response.data.token);
  //           localStorage.setItem('name', response.data.loginId);
  //           dispatch(login(response.data.name))
  //           // history.push('/')
  //           window.location.replace("/")

  //           console.log("로그인이 되었어요")
  //       }
  //   })
  //   .catch((err) => {
  //      console.log(err);
  //      window.alert("아이디와 비밀번호가 일치하지 않습니다.")
  // })
};

const signupAction = (userId, password) => {
  return function (dispatch, getState, { history }) {
    const userInfo = {
      userId: userId,
      password: password,
    };
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
  logoutAction,
  signupAction,
};

export { actionCreators };
