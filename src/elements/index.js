import { createGlobalStyle } from "styled-components";
import Grid from "./Grid";
import Button from "./Button";
import Input from "./Input";
import Text from "./Text";
import Image from "./Image";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-big: 20px;
    --color-main: #778F79;
    --color-sub: #A08766;
  }
`;

export { GlobalStyle, Grid, Button, Input, Text, Image };
