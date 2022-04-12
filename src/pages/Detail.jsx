import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Button, Grid, Text, Input, Image } from "../elements";

const Detail = () => {
  return (
    <>
      <Sttitle>
        <Input label="제목"></Input>
      </Sttitle>
      <input type="file" multiple="multiple" accept="image/jpeg,.txt" />
      <>
        <div>
          <Stpost label="게시글 내용" placeholder="게시글 작성" multiLine />
        </div>
      </>
    </>
  );
};

export default Detail;

const Sttitle = styled.div`
  width: 600px;
`;
const StImg = styled.div``;
const Stpost = styled.input`
  width: 600px;
  height: 500px;
`;
