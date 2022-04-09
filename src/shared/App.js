import React from "react";
import { Grid } from "../elements";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// components
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

//pages
import Login from "../pages/Login";
import Main from "../pages/Main";
import Category from "../pages/Category";
import Detail from "../pages/Detail";
import Mypost from "../pages/Mypost";
import Post from "../pages/Post";
import Signup from "../pages/Signup";
import Update from "../pages/Update";

function App() {
  return (
    <div className="App">
      <Grid is_flex>
        <BrowserRouter>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/main" exact component={Main}>
            <Sidebar />
            <Header />
          </Route>
          <Route path="/category" exact component={Category} />
          <Route path="/detail" exact component={Detail} />
          <Route path="/mypost" exact component={Mypost} />
          <Route path="/post" exact component={Post} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/update" exact component={Update} />
        </BrowserRouter>
      </Grid>
    </div>
  );
}

export default App;
