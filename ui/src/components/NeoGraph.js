import React from "react";
import Graph from "react-graph-vis";

const defaultOptions = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

const defaultEvents = {
  select: function (event) {
    const {nodes, edges} = event;
    nodes && console.log("Selected nodes:", nodes);
    edges && console.log("Selected edges:", edges);
  }
};

const makeNodes = graph => [
  ...graph.Actor.map(actor => {
    return {
      id: actor.id,
      label: `Actor ${actor.name}`,
      title: actor.name
    }
  }),
  ...graph.Cell.map(cell => {
    return {
      id: cell.id,
      label: `Cell ${cell.name}`,
      title: cell.name
    }
  }),
  ...graph.Organization.map(org => {
    return {
      id: org.id,
      label: `Organization ${org.name}`,
      title: org.name
    }
  }),
];

const makeEdges = graph => [
  ...graph.Actor
    .map(actor => {
      return actor.commitments.map(it => {
        return {
          from: actor.id,
          to: it.Cell.id,
          label: 'COMMITMENT',
        }
      })
    })
    .flat(),
  ...graph.Cell
    .map(cell => {
      return cell.contracts.map(it => {
        return {
          from: cell.id,
          to: it.Organization.id,
          label: 'CONTRACT',
        }
      })
    })
    .flat(),
];

export default ({
                  neoGraph,
                  options = defaultOptions,
                  events = defaultEvents,
                  getNetwork = network => console.log({network})
                }) => {
  const graph = {
    nodes: makeNodes(neoGraph),
    edges: makeEdges(neoGraph)
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={getNetwork}
    />
  )
}
