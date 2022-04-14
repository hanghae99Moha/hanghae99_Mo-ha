import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { actionCreators } from "../redux/modules/post";
import { Button, Grid, Text, Input, Image } from "../elements";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { history } from "../redux/configureStore";

// import react icons
import { FcLike, FcLikePlaceholder, FcDislike } from "react-icons/fc";

const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.post.detail);
  const is_token = localStorage.getItem("token") ? true : false;

  const [heart, setHeart] = useState(false);

  useEffect(() => {
    dispatch(actionCreators.getPostDetailMD(params.id));
  }, []);

  return (
    <React.Fragment>
      <StDetailWrap>
        <StDetailWrapImageBox>
          <Image src={data.imageUrl} />
        </StDetailWrapImageBox>
        <StDetailTitle>{data.title}</StDetailTitle>
        <StLikeBox>
          {is_token ? (
            <>
              <Link to={`/post/${params.id}`}>
                <Button
                  _style={{
                    width: "100px",
                    height: "40px",
                    borderRadius: "10px",
                    border: "1px solid #eee",
                    backgroundColor: "var(--color-main)",
                    color: "#fff",
                  }}
                >
                  수정하기
                </Button>
              </Link>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Like
                <FcLikePlaceholder
                  style={{ fontSize: "30px", marginLeft: "10px" }}
                ></FcLikePlaceholder>
              </div>
            </>
          ) : null}
        </StLikeBox>
        <StDetailDesc>
          <StDetailCategory>지역: {data.category}</StDetailCategory>
          <StDetailDescbox>
            <StDetailDate>{data.createdAt}</StDetailDate>
          </StDetailDescbox>
          <StDetailContents>{data.contents}</StDetailContents>
        </StDetailDesc>
      </StDetailWrap>
      <ButtonBox>
        <Button
          _style={{
            width: "100px",
            height: "40px",
            borderRadius: "10px",
            border: "1px solid #eee",
            backgroundColor: "var(--color-main)",
            color: "#fff",
          }}
          onClick={() => {
            history.push("/main");
          }}
        >
          뒤로가기
        </Button>
      </ButtonBox>
    </React.Fragment>
  );
};

export default Detail;

const StDetailWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: auto;
`;

const StDetailTitle = styled.div`
  max-width: 500px;
  margin-bottom: 40px;
`;

const StLikeBox = styled.div`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  color: #666;
  margin-bottom: 10px;
`;

const StDetailWrapImageBox = styled.div`
  max-width: 100%;
  padding: 30px;
  margin: 20px;
  box-sizing: border-box;
`;

const StDetailDesc = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 500px;
`;

const StDetailCategory = styled.p`
  border-bottom: 1px solid #eee;
  max-width: 90%;
  margin: auto;
  padding: 10px 0;
`;
const StDetailDescbox = styled.div`
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  max-width: 90%;
  margin: auto;
  padding: 5px 0;
`;
const StDetailUser = styled.p`
  font-weight: bold;
  color: red;
`;
const StDetailDate = styled.p``;
const StDetailContents = styled.p`
  max-width: 90%;
  margin: auto;
  padding: 5px 0;
  margin: 20px auto;
`;

const ButtonBox = styled.div`
  position: fixed;
  left: 400px;
  top: 50px;
  display: flex;
  justify-content: center;
  z-index: 9999;
`;
