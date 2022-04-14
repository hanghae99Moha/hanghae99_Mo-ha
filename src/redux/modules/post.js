import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";
import axios from "axios";

// action
const GET_POST = "GET_POST";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";
const ADD_POST = "ADD_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// init
const initialState = {
  list: [],
  preview: null,
  thumbnail: "http://via.placeholder.com/400x300",
  title: "",
  desc: "",
  category: "",
  is_loding: false,
  image: false,
  uploading: false,
};

// middleware
const getPostMD = () => {
  return async function (dispatch, getState, { history }) {
    // const token = localStorage.getItem('token');
    try {
      const { data } = await api.get("/posts");
      dispatch(getPost(data));
    } catch (error) {
      alert("데이터를 불러오지 못했습니다");
      // console.log(error);
    }
  };
};

const uploadDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    console.log(payload);

    const formData = new FormData();
    formData.append("file", payload.file); // 서버단이랑 협의요
    formData.append(
      "information",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    ); // 서버단이랑 협의요
    await axios({
      method: "post",
      url: "http://13.209.7.115/api/posts",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        window.alert("사진이 업로드 되었습니다.");
        dispatch(uploadImg(response.data.imageUrl));
        console.log(response.data.imageUrl);
        setPreview(`${response.data.imageUrl}`);
      })
      .catch((err) => {
        window.alert("사진 업로드 실패");
      });
  };
};

// const getPostDetail = (payload) => {
//   return async function (dispatch, getState, { history }) {
//     try {
//       const { data } = await api.get(`/posts/${}`);
//       dispatch(getPost(data));
//     } catch (error) {
//       alert("데이터를 불러오지 못했습니다");
//       // console.log(error);
//     }
//   };
// };

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
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
        console.log(state, action);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostMD,
  uploadDB,
  uploadImg,
  setPreview,
};

export { actionCreators };
