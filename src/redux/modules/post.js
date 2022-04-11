import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";

// action
const GET_POST = "GET_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));

// init
const initialState = {
  list: [],
};

// middleware
const getPostMD = () => {
  return async function (dispatch, getState, { history }) {
    // const token = localStorage.getItem('token');
    try {
      const { data } = await api.get("/posts");
      // console.log(data);
      dispatch(getPost(data));
    } catch (error) {
      alert("데이터를 불러오지 못했습니다");
      // console.log(error);
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // console.log(state);
        // console.log(action);
        draft.list = action.payload.post_list;
        // console.log(draft.list);
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostMD,
};

export { actionCreators };
