import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import {SnackbarProvider} from "notistack"

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI
});

const Main = () => (
  <ApolloProvider client={client}>
    <SnackbarProvider maxSnack={3}>
      <App/>
    </SnackbarProvider>
  </ApolloProvider>
);

ReactDOM.render(<Main/>, document.getElementById("root"));
registerServiceWorker();
