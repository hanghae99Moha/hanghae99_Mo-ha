import React from "react";
import styled from "styled-components";

// redux
import { useSelector, useDispatch } from "react-redux";

// components
import Postbox from "../components/Postbox";

// elements
import { Button, Grid, Text, Input, Image } from "../elements";

const Post = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const { history } = props;

  const [contents, setContents] = React.useState("");

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
              <Text margin="0" size="24px" bold>
                이미지
              </Text>
            </Grid>
          </Grid>

          <Image src={"http://via.placeholder.com/400x300"} />

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
            <Button text="게시글 작성" _onClick={() => {}}>
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
