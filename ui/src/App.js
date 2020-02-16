import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import OriginalLayout from "./components/OriginalLayout";

import UserList from "./pages/UserList";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Vis from "./pages/Vis";
import Actors from "./pages/Actors";
import Cells from "./pages/Cells";

export default () =>
  <Router>
    <Switch>
      <Route path="/hello">
        <p>Hello World!</p>
      </Route>
      <Route path="/original">
        <OriginalLayout>
          <UserList/>
        </OriginalLayout>
      </Route>
      <Route exact path="/">
        <MainLayout>
          <Home/>
        </MainLayout>
      </Route>
      <Route exact path="/actors">
        <MainLayout>
          <Actors/>
        </MainLayout>
      </Route>
      <Route exact path="/cells">
        <MainLayout>
          <Cells/>
        </MainLayout>
      </Route>
      <Route path="/vis">
        <MainLayout>
          <Vis/>
        </MainLayout>
      </Route>
    </Switch>
  </Router>

