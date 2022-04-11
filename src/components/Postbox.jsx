import React from "react";
import styled from "styled-components";

const Post = () => {
  return (
    <Postwrap>
      <Postbox>
        <Formbox>
          <StInput></StInput>
          <StInput></StInput>
          <StInput></StInput>
          <StInput></StInput>
        </Formbox>
      </Postbox>
    </Postwrap>
  );
};

export default Post;

const Postwrap = styled.div`
  border: 1px solid red;
`;

const Postbox = styled.div`
  border: 1px solid blue;
`;

const Formbox = styled.form`
  border: 1px solid blue;
`;

const StInput = styled.input`
  border: 1px solid blue;
`;
