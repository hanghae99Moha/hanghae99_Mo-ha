import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Image } from "../elements";

const ResponsiveSlider = () => {
  const Post_list = useSelector((state) => state.post.list);
  console.log(Post_list);

  const Post_list_image = Post_list.map((cur) => cur.imageUrl);
  console.log(Post_list_image);

  let arrImage = [];
  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * Post_list_image.length);

    if (arrImage.indexOf(randomNumber) === -1) {
      arrImage.push(Post_list_image.splice(randomNumber, 1));
    } else {
      i--;
    }
  }
  console.log(arrImage);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <StSlider>
      <Slider {...settings}>
        <ImageBox>
          <Image src={arrImage[0]}></Image>
        </ImageBox>
        <ImageBox>
          <Image src={arrImage[1]}></Image>
        </ImageBox>
        <ImageBox>
          <Image src={arrImage[2]}></Image>
        </ImageBox>
        <ImageBox>
          <Image src={arrImage[3]}></Image>
        </ImageBox>
        <ImageBox>
          <Image src={arrImage[4]}></Image>
        </ImageBox>
        <ImageBox>
          <Image src={arrImage[5]}></Image>
        </ImageBox>
      </Slider>
    </StSlider>
  );
};

export default ResponsiveSlider;

const StSlider = styled.div`
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;
`;

const ImageBox = styled.div`
  width: 100%;
  padding: 30px;
  margin: 20px;
  box-sizing: border-box;
`;
