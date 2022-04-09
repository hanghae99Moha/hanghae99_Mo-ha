import React from "react";
import { Grid } from "../elements";
import { Route } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";

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
import Update from "../pages/Update";

function App() {
  return (
    <div className="App">
      <Grid is_flex>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Grid is_flex width="100%">
              <Sidebar />
              <Grid width="100%" vh="100vh" margin="0 0 0 350px">
                <Header />
                <Route path="/main" exact component={Main}></Route>
                <Route path="/category" exact component={Category} />
                <Route path="/detail" exact component={Detail} />
                <Route path="/mypost" exact component={Mypost} />
                <Route path="/post" exact component={Post} />
                <Route path="/update" exact component={Update} />
              </Grid>
            </Grid>
          </Switch>
        </BrowserRouter>
      </Grid>
    </div>
  );
}

export default App;
