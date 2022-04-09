import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// action
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));

// init
const initialState = {
  list: [],
};

// middleware
const getPostMD = () => {
  return function (dispatch, getState, { history }) {
    const data = axios.get();
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostMD,
};

export { actionCreators };
