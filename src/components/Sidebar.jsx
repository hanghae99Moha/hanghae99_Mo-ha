import React from "react";
import styled from "styled-components";

// elements
import { Button, Grid, Input } from "../elements";

const Sidebar = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Sidebar;

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
