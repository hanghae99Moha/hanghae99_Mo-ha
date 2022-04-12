import React from "react";
import styled from "styled-components";
import { actionCreators } from "../redux/modules/post";

// redux
import { useSelector, useDispatch } from "react-redux";

// elements
import { Button, Grid, Text, Image } from "../elements";
import { useParams } from "react-router-dom";

const Post = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const useState = React.useState();

  const { history } = props;

  // useSelector
  const post_list = useSelector((state) => state.post.list);
  const __thumbnail = useSelector((state) => state.post.thumbnail);
  const preview = useSelector((state) => state.post.preview);

  // const uploading = useSelector((state) => state.post.uploading);
  // const is_uploading = useSelector((state) => state.image.uploading);

  const post_id = props.match.params.id; // 1
  const is_edit = post_id ? true : false;
  let _post =
    is_edit && post_list ? post_list.find((p) => p.id === post_id) : null;

  // useState
  const [loading, setLoading] = React.useState(false); // 작업 완료 후 true 수정요
  const [desc, setDesc] = React.useState(_post ? _post.desc : "");
  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [category, setCategory] = React.useState(_post ? _post.category : "");

  // token
  const is_token = localStorage.getItem("token") ? true : false;
  const token = localStorage.getItem("token");

  // useRef for image preview
  const fileInput = React.useRef();

  // useEffect
  React.useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, []);

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
    console.log(category);
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
    if (title === "" || desc === "" || category === "") {
      window.alert("작성란을 모두 채워주세요.");
      return;
    }
    let file = fileInput.current.files[0];

    // 백엔드와 KEY 값 협의요
    dispatch(
      actionCreators.uploadDB({
        information: { title: title, desc: desc, category: category },
        file,
      })
    );
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeDesc = (e) => {
    setDesc(e.target.value);
  };

  // 수정 함수
  const editPost = () => {
    dispatch(
      actionCreators.editPostDB(_post.id, {
        desc: desc,
        title: title,
      })
    );
  };

  // 삭제 함수
  const delPost = () => {
    dispatch(actionCreators.deletePostDB(_post.id));
    //history.replace("/")
  };
  const onRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      delPost();
    } else {
      alert("취소");
    }
  };

  // if (!is_token) {
  //   return (
  //     <IsLoginScrn>
  //       <p>잠깐,</p>
  //       <p> 로그인 이후 포스팅이 가능합니다.</p>
  //       <button
  //         onClick={() => {
  //           history.replace("/");
  //         }}
  //       >
  //         로그인 하러가기
  //       </button>
  //     </IsLoginScrn>
  //   );
  // }

  return (
    <>
      {loading ? (
        <LodingScrn>불러오는 중 입니다.</LodingScrn>
      ) : (
        <StPostwrap>
          <StPostbox>
            <form onSubmit={uploadDB}>
              <Grid padding="16px">
                <Text margin="0" size="26px" bold>
                  게시글 작성
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

              <div style={{ width: "100%" }}>
                <Image backgroundSize src={preview ? preview : __thumbnail} />
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
                  style={{
                    width: "400px",
                    height: "200px",
                    border: "1px solid #999",
                    borderRadius: "10px",
                  }}
                  onChange={changeDesc}
                />
              </Grid>
              <Grid padding="16px">
                <Button text="게시글 작성" _onClick={uploadDB}>
                  게시글작성
                </Button>
              </Grid>
            </form>
          </StPostbox>
        </StPostwrap>
      )}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPostbox = styled.div`
  max-width: 600px;
  margin: auto;
`;
