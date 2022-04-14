import React from "react";
import styled from "styled-components";
import { actionCreators } from "../redux/modules/post";

// redux
import { useSelector, useDispatch } from "react-redux";

// elements
import { Button, Grid, Text, Image } from "../elements";
import { useParams } from "react-router-dom";
import api from "../api/api";

const Post = (props) => {
  const useState = React.useState();
  const dispatch = useDispatch();
  const params = useParams();
  const { history } = props;

  // useSelector
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  const __thumbnail = useSelector((state) => state.post.thumbnail);
  const preview = useSelector((state) => state.post.preview);

  const post_id = params.id;

  const is_edit = post_id ? true : false;
  let _post =
    is_edit && post_list
      ? post_list.findIndex((p) => p.postId + "" === post_id)
      : null;

  console.log(params.id, is_edit, post_list, _post);

  // useState
  const [loading, setLoading] = React.useState(true); // 작업 완료 후 true 수정요
  const [contents, setContents] = React.useState(
    _post ? post_list[_post].contents : ""
  );
  const [title, setTitle] = React.useState(_post ? post_list[_post].title : "");
  const [category, setCategory] = React.useState(
    _post ? post_list[_post].category : ""
  );
  const [imageUrl, serImageUrl] = React.useState(
    _post ? post_list[_post].imageUrl : ""
  );

  // token
  const is_token = localStorage.getItem("token") ? true : false;
  const token = localStorage.getItem("token");

  // useRef for image preview
  const fileInput = React.useRef();

  // useEffect
  React.useEffect(() => {
    if (is_edit && !_post) {
      history.replace("/main");
    }
    dispatch(actionCreators.getPostMD());
    dispatch(actionCreators.preventRefresh());
    if (is_edit) {
      dispatch(actionCreators.editImage(post_list[_post].imageUrl));
    }
  }, []);

  const name = localStorage.getItem("name");

  // select
  const SelectList = [
    "지역",
    "서울",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  const onChangeSelectHandler = (e) => {
    setCategory(e.target.value);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
  };

  const uploadDB = (e) => {
    e.preventDefault();
    if (title === "" || contents === "" || category === "") {
      window.alert("작성란을 모두 채워주세요.");
      return;
    }
    let file = fileInput.current.files[0];

    // 백엔드와 KEY 값 협의요
    dispatch(
      actionCreators.uploadDB({
        information: {
          title: title,
          contents: contents,
          category: category,
          name: name,
        },
        file,
      })
    );
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changecontents = (e) => {
    setContents(e.target.value);
  };

  // 수정 함수
  const editPost = () => {
    let file = fileInput.current.files[0];
    dispatch(
      actionCreators.editPostDB(post_list[_post].postId, {
        information: {
          title: post_list[_post].title,
          contents: post_list[_post].contents,
          category: post_list[_post].category,
          name: post_list[_post].name,
        },
        file,
      })
    );
  };

  // 삭제 함수
  const delPost = () => {
    dispatch(actionCreators.deletePostDB(post_list[_post].postId));
    history.replace("/main");
  };
  const onRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      delPost();
    } else {
      alert("취소");
    }
  };

  if (!is_token) {
    return (
      <IsLoginScrn>
        <p>잠깐,</p>
        <p> 로그인 이후 포스팅이 가능합니다.</p>
        <button
          onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </button>
      </IsLoginScrn>
    );
  }

  return (
    <>
      <StPostwrap>
        <StPostbox>
          <form onSubmit={uploadDB}>
            <Grid padding="16px">
              <Text margin="0" size="26px" bold>
                {is_edit ? "게시글 수정" : "게시글 작성"}
              </Text>
            </Grid>
            <Grid>
              <Grid padding="16px">
                <input
                  type="file"
                  onChange={selectFile}
                  ref={fileInput}
                  // disabled={is_uploading}
                />
                <Text margin="0" size="24px" bold>
                  이미지
                </Text>
              </Grid>
            </Grid>

            <div style={{ width: "100%", height: "100%" }}>
              {is_edit ? (
                <Image backgroundSize src={imageUrl} />
              ) : (
                <Image backgroundSize src={preview ? preview : __thumbnail} />
              )}
            </div>

            <Grid padding="16px">
              <select onChange={onChangeSelectHandler} value={category}>
                {SelectList.map((cur) => (
                  <option value={cur} key={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid padding="16px">
              <input
                value={title}
                style={{
                  width: "400px",
                  height: "40px",
                  border: "1px solid #999",
                  borderRadius: "10px",
                }}
                onChange={changeTitle}
              />
            </Grid>
            <Grid padding="16px">
              <textarea
                value={contents}
                style={{
                  width: "400px",
                  height: "200px",
                  border: "1px solid #999",
                  borderRadius: "10px",
                }}
                onChange={changecontents}
              />
            </Grid>
            <Grid is_flex>
              {!is_edit ? (
                <Button
                  type="button"
                  _style={{
                    backgroundColor: "var(--color-main)",
                    border: "none",
                    width: "400px",
                    height: "50px",
                    margin: "auto",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  text="게시글 작성"
                  _onClick={uploadDB}
                >
                  게시글 작성
                </Button>
              ) : (
                <>
                  <Button
                    _type="button"
                    _style={{
                      backgroundColor: "var(--color-main)",
                      border: "none",
                      width: "200px",
                      height: "50px",
                      margin: "auto",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    text="수정"
                    _onClick={editPost}
                  >
                    수정
                  </Button>
                  <Button
                    type="button"
                    _style={{
                      backgroundColor: "var(--color-main)",
                      border: "none",
                      width: "200px",
                      height: "50px",
                      margin: "auto",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    text="삭제"
                    _onClick={onRemove}
                  >
                    삭제
                  </Button>
                </>
              )}
            </Grid>
          </form>
        </StPostbox>
      </StPostwrap>
      )
    </>
  );
};

export default Post;

const IsLoginScrn = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 24px;
    color: #666;
  }

  button {
    background-color: transparent;
    border: 1px solid #666;
    width: 300px;
    height: 50px;
    font-weight: bold;
    color: #666;
    transition: ease-in-out 0.3s;
    border-radius: 20px;

    cursor: pointer;

    &:hover {
      background-color: var(--color-main);
      border: 1px solid var(--color-main);
      color: #fff;
      border-radius: 0px;
    }
  }
`;

const LodingScrn = styled.div`
  color: #bbb;
  font-size: 30px;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPostwrap = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPostbox = styled.div`
  max-width: 600px;
  margin: auto;
`;
