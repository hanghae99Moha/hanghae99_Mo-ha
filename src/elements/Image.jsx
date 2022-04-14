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
  src: "http://via.placeholder.com/400x400",
  size: 36,
  backgroundSize: "cover",
};

const AspectOutter = styled.div`
  max-width: 400px;
  min-width: 200px;
  max-height: 400px;
  min-height: 200px;
  margin: auto;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export default Image;
