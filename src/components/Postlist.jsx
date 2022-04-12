import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/post";

import Card from "./Card";

const Postlist = (props) => {
  const post_list = useSelector((state) => state.post.list);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, []);

  return (
    <PostlistWrap>
      <PostlistCardsBox>
        {post_list.map((cur, idx) => {
          return <Card key={idx} {...cur} idx={idx} />;
        })}
      </PostlistCardsBox>
    </PostlistWrap>
  );
};

export default Postlist;

const PostlistWrap = styled.div`
  max-width: 1200px;
  margin: auto;
  height: 100%;
`;

const PostlistCardsBox = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding-bottom: 20px;
`;
