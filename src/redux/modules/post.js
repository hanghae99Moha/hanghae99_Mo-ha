import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";
import axios from "axios";

// action
const GET_POST = "GET_POST";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";
const GET_POST_DETAIL = "GET_POST_DETAIL";
const DELETE_POST = "DELETE_POST";
const EDIT_IMAGE = "EDIT_IMAGE";
const PREVENT_REFRESH = "PREVENT_REFRESH";
const EDIT_POST = "EDIT_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPostDetail = createAction(GET_POST_DETAIL, (payload) => ({ payload }));
const deletePost = createAction(DELETE_POST, (payload) => ({ payload }));
const editImage = createAction(EDIT_IMAGE, (payload) => ({ payload }));
const preventRefresh = createAction(PREVENT_REFRESH, (payload) => ({
  payload,
}));
const editPost = createAction(EDIT_POST, (post_id, payload) => ({
  post_id,
  payload,
}));

// init
const initialState = {
  list: [],
  preview: null,
  thumbnail: "http://via.placeholder.com/400x400",
  title: "",
  desc: "",
  category: "",
  is_loding: false,
  image: false,
  uploading: false,
  postId: "",
  detail: [],
};

// middleware
const getPostMD = () => {
  return async function (dispatch, getState, { history }) {
    // const token = localStorage.getItem('token');
    try {
      // const { data } = await api.get("/posts");
      const { data } = await api.get("/api/posts");
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
    formData.append("file", payload.file);
    formData.append(
      "information",
      new Blob([JSON.stringify(payload.information)], {
        type: "application/json",
      })
    );
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
        setPreview(`${response.data.imageUrl}`);
        history.replace("/main");
      })
      .catch((err) => {
        window.alert("사진 업로드 실패");
      });
  };
};

// get post detail : 수정필요 API, res
const getPostDetailMD = (payload) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const { data } = await api.get(`/posts/${payload}`);
      const { data } = await api.get(`/api/posts/${payload}`);
      dispatch(getPostDetail(data));
    } catch (error) {
      alert("페이지 불러오는것을 실패했습니다.");
    }
  };
};

const deletePostDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    try {
      await api.delete(`/api/posts/${payload}`);
      const _post = getState().post.list;
      const post_index = _post.findIndex(
        (p) => parseInt(p.payload) === parseInt(payload)
      );
      dispatch(deletePost(post_index));
      dispatch(getPostMD());
    } catch {
      window.alert("포스트 삭제 성공 !!!");
    }
  };
};

// 미구현..
const editPostDB = (post_id = null, post = {}) => {
  return async function (dispatch, getState, { history }) {
    console.log(post_id);
    console.log(post.information);
    console.log(post.file);

    if (!post_id) {
      console.log("게시물 정보가 없습니다");
      return;
    }

    const _image = getState().post.list.imageUrl;
    console.log(_image);

    const _post_idx = getState().post.list.findIndex(
      (p) => p.postId === post_id
    );
    console.log(_post_idx);

    const _post = getState().post.list[_post_idx];
    console.log(_post);
    return;
    if (_image === _post.imageUrl) {
      const formData = new FormData();
      formData.append(
        "information",
        new Blob([JSON.stringify(post.information)], {
          type: "application/json",
        })
      );
      await axios({
        method: "put",
        url: `http://54.180.105.154/api/posts/${post.postId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          window.alert("수정 포스트 업로드 성공!!!");
          dispatch(
            editPost(post.file, { information: post.information }, post.postId)
          );
        })
        .catch((err) => {
          window.alert("수정오류!");
        });
    } else if (_image !== _post.imageUrl) {
      const formData = new FormData();
      formData.append("file", post.file);
      formData.append(
        "information",
        new Blob([JSON.stringify(post.information)], {
          type: "application/json",
        })
      );

      await axios({
        method: "put",
        url: `http://54.180.105.154/api/posts/${post.postId}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          window.alert("수정 포스트 업로드 성공!!!");
          dispatch(
            editPost(post.file, { information: post.information }, post.postId)
          );

          console.log(response.data.imageUrl);
          setPreview(`${response.data.imageUrl}`);
          window.location.href = "/";
        })
        .catch((err) => {
          window.alert("수정오류!");
        });
    }
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
        console.log(action.payload.preview);
      }),
    [GET_POST_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.payload;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log("action", action);
        draft.list = state.list.filter(
          (p) => p.id + "" !== action.payload.postId
        );
        console.log(draft.list);
      }),
    [EDIT_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
      }),
    [PREVENT_REFRESH]: (state, action) =>
      produce(state, (draft) => {
        console.log("state:::", state, "draft:::", draft, "action:::", action);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.list);
        console.log(...draft.list);
        console.log(action);
        console.log("안녕 난 리듀서 편집이얌 ");
        let idx = draft.list.findIndex(
          (p) => parseInt(p.postId) === parseInt(action.payload.postId.postId)
        );
        console.log(idx);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
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
  deletePost,
  deletePostDB,
  getPostDetail,
  getPostDetailMD,
  editImage,
  preventRefresh,
  editPost,
  editPostDB,
};

export { actionCreators };
