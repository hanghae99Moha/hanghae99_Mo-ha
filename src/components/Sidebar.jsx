import React from "react";
import styled from "styled-components";

// elements
import { GlobalStyle } from "../elements";
import { Button, Grid, Input } from "../elements";

const Sidebar = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <SidebarPosition>
        <Grid is_flex fd="column">
          <Grid>
            <Top>top</Top>
          </Grid>
          <Grid>
            <Greeting>greeting</Greeting>
          </Grid>
          <Grid>
            <Bottom>footer</Bottom>
          </Grid>
        </Grid>
      </SidebarPosition>
    </React.Fragment>
  );
};

export default Sidebar;

const SidebarPosition = styled.div`
  height: 100vh;
  width: 400px;
  box-sizing: border-box;
  background-color: var(--color-main);
  /* position: fixed; */
`;

const Top = styled.div`
  background-color: tomato;
  width: 100%;
`;

const Greeting = styled.h1`
  color: #333;
`;

const Bottom = styled.div`
  background-color: tomato;
  width: 100%;
`;
