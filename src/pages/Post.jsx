import React from "react";
import styled from "styled-components";

// redux
import { useSelector, useDispatch } from "react-redux";

// components
import Postbox from "../components/Postbox";

// elements
import { Button, Grid, Text, Input, Image } from "../elements";
import api from "../api/api";

const Post = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const { history } = props;

  const [contents, setContents] = React.useState("");

  // 이미지 업로드
  const [imgBase64, setImgBase64] = React.useState([]); // 파일 base64
  const [imgFile, setImgFile] = React.useState(null); //파일

  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드 실행
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  const WriteBoard = async () => {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));

    // fd.append("comment", comment);

    await api
      .post("/posts", fd, {
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          history.push("/test1");
        }
      })
      .catch((error) => {
        // 예외 처리
      });
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  console.log(contents);

  // if (!is_login) {
  //   return (
  //     <Grid padding="16px" border="1px solid red" center>
  //       <Text size="20px">로그인 후에만 글을 쓸 수 있어요!</Text>
  //       <Button
  //         _onClick={() => {
  //           history.replace("/");
  //         }}
  //       >
  //         로그인 하기
  //       </Button>
  //     </Grid>
  //   );
  // }
  return (
    <React.Fragment>
      <StPostwrap>
        <StPostbox>
          <Grid padding="16px">
            <Text margin="0" size="26px" bold>
              게시글 작성
            </Text>
          </Grid>

          <Grid>
            <Grid padding="16px">
              <input
                type="file"
                id="file"
                onChange={handleChangeFile}
                multiple="multiple"
              />
              <Text margin="0" size="24px" bold>
                이미지
              </Text>
            </Grid>
          </Grid>

          {imgBase64.map((item) => {
            return (
              <img
                className="d-block w-100"
                src={item}
                alt="First slide"
                style={{ width: "100%", height: "550px" }}
                key="item"
              />
            );
          })}
          {/* <Image src={"http://via.placeholder.com/400x300"} /> */}

          <Grid padding="16px">
            <Stselect>
              <option value="">지역을 선택해주세요</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="충북">충북</option>
              <option value="충남">충남</option>
              <option value="경북">경북</option>
              <option value="경남">경남</option>
              <option value="전북">전북</option>
              <option value="전남">전남</option>
              <option value="제주">제주</option>
            </Stselect>
          </Grid>

          <Grid padding="16px">
            <Input label="제목"></Input>
          </Grid>

          <Grid padding="16px">
            <Input
              value={contents}
              _onChange={changeContents}
              label="게시글 내용"
              placeholder="게시글 작성"
              multiLine
            />
          </Grid>

          <Grid padding="16px">
            <Button text="게시글 작성" _onClick={WriteBoard}>
              게시글작성
            </Button>
          </Grid>
        </StPostbox>
      </StPostwrap>
    </React.Fragment>
  );
};

export default Post;

const StPostwrap = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const StPostbox = styled.div`
  max-width: 600px;
  margin: auto;
`;

const Stselect = styled.select``;
