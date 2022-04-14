import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./index";

const Button = ({ children, ...props }) => {
  return (
    <StBtn
      type={props._type}
      onClick={props._onClick}
      style={props._style}
      {...props}
    >
      <GlobalStyle />
      {children}
    </StBtn>
  );
};

export default Button;

const StBtn = styled.button`
  ${(props) => (props.width ? `width: ${props.width};` : "80px")}
  ${(props) => (props.height ? `height: ${props.height};` : "30px")}
  ${(props) => (props.bg ? `backgroundColor: ${props.bg};` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "1px solid #eee")}
  ${(props) =>
    props.shadow
      ? `boxShadow: ${props.shadow};`
      : "3px 5px 10px 10px rgba(0, 0, 0, 0.5)"}
    
  &:hover {
    cursor: pointer;
    background-color: var(--color-main);
  }
`;
