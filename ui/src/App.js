import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import OriginalLayout from "./components/OriginalLayout";

import UserList from "./pages/UserList";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";

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
      <Route path="/">
        <MainLayout>
          <Home/>
        </MainLayout>
      </Route>
    </Switch>
  </Router>

