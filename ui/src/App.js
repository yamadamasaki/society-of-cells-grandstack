import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import OriginalLayout from "./components/OriginalLayout";

import UserList from "./pages/UserList";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/hello">
            <p>Hello World!</p>
          </Route>
          <Route path="/">
            <OriginalLayout>
              <UserList/>
            </OriginalLayout>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
