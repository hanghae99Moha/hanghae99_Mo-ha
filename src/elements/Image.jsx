import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, backgroundSize } = props;

  const styles = {
    src: src,
    size: size,
    backgroundSize,
  };

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "rectangle",
  src: "http://via.placeholder.com/400x300",
  size: 36,
  backgroundSize: "cover",
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
