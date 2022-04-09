import React from "react";
import styled from "styled-components";

const Input = ({ children, ...props }) => {
  return <StInput {...props}>{children}</StInput>;
};

export default Input;

const StInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "100px")}
  ${(props) => (props.height ? `height: ${props.height};` : "30px")}
  &:focus {
    border: none;
  }
`;
