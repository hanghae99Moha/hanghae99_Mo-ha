import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import post from "../redux/modules/post";
import { Image } from "../elements";

const Card = (props) => {
  const dispatch = useDispatch();
  const Post_list = useSelector((state) => state.post.list);
  const index = props.idx;

  return (
    <CardsWrap
      onClick={() => {
        history.push(`/detail/${props.postId}`);
      }}
    >
      <CardsImg>
        <Image src={Post_list[index].imageUrl}></Image>
      </CardsImg>
      <CardsInfo>
        <CardsInfoCat>{props.category}</CardsInfoCat>
        <CardsInfoTitle>{props.title}</CardsInfoTitle>
        <CardsInfoDesc>{props.desc}</CardsInfoDesc>
      </CardsInfo>
    </CardsWrap>
  );
};

export default Card;

const CardsWrap = styled.div`
  box-sizing: border-box;
  box-shadow: 1px 5px 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  margin: 20px auto;
  width: 600px;
  height: 100%;

  transition: ease-in-out 0.1s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const CardsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 10px;
  overflow: auto;
`;

const CardsInfoCat = styled.h4`
  margin: -10px 0;
`;
const CardsInfoTitle = styled.div`
  margin: -10px 0;
`;
const CardsInfoDesc = styled.div`
  width: 300px;
  height: 100px;
  color: #666;
  overflow: hidden;
`;

const CardsImg = styled.div`
  max-width: 300px;
  overflow: hidden;
`;
