import React from "react";
/*
import makeStyles from "@material-ui/core/styles/makeStyles";
import {NeoGraph} from "../components/NeoGraph";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    margin: 5,
  },
  title: {
    fontSize: 14,
  }
}));

const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "yamadamasaki";

export default props => {
  const classes = useStyles(props);

  const config = {
    server_url: NEO4J_URI,
    server_user: NEO4J_USER,
    server_password: NEO4J_PASSWORD,
    labels: {
      "Character": {
        "caption": "name",
        "size": "pagerank",
        "community": "community"
      }
    },
    relationships: {
      "INTERACTS": {
        "thickness": "weight",
        "caption": false
      }
    },
    initial_cypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
  };

  return (
    <>
      <h1 className={classes.root}>VIS</h1>
      <NeoGraph config={config} width={400} height={300} backgroundColor={"#b2beb5"} containerId="id0"/>
    </>
  )
}
 */
import Graph from "react-graph-vis";

export default () => {
  const graph = {
    nodes: [
      {id: 1, label: "Node 1", title: "node 1 tootip text"},
      {id: 2, label: "Node 2", title: "node 2 tootip text"},
      {id: 3, label: "Node 3", title: "node 3 tootip text"},
      {id: 4, label: "Node 4", title: "node 4 tootip text"},
      {id: 5, label: "Node 5", title: "node 5 tootip text"}
    ],
    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function (event) {
      let {nodes, edges} = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}
