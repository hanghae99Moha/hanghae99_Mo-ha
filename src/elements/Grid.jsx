import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./index";

const Grid = ({ children = null, ...props }) => {
  return (
    <StGrid {...props}>
      <GlobalStyle />
      {children}
    </StGrid>
  );
};

export default Grid;

const StGrid = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;

  // 추가 props
  max-width: ${(props) => props.maxWidth};
  position: ${(props) => props.position};
  border: ${(props) => props.border};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.JustifyContent};

  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.center ? `text-align: center;` : "")};
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""};
  ${(props) => (props.fd ? `flex-direction: ${props.fd};` : "")};
  ${(props) => (props.vh ? `height: ${props.vh};` : "")}
`;
