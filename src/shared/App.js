import React from "react";
import { Grid } from "../elements";

// components
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

function App() {
  return (
    <div className="App">
      <Grid is_flex>
        <Sidebar />
        <Header />
      </Grid>
    </div>
  );
}

export default App;
