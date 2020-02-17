import React from "react";
import MaterialTable from "material-table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  CREATE_ACTOR,
  DELETE_ACTOR,
  GET_ALL_ACTORS_TREE,
  positionsWithLabel,
  UPDATE_ACTOR
} from "../utils/model";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import CellTable from "./CellTable";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%"
  }
});

const schema = [
  { title: "name", field: "name" },
  { title: "position", field: "position", lookup: positionsWithLabel },
  {
    title: "qualification",
    field: "qualification",
    render: rowData => (
      <textarea value={rowData.qualification || ""} readOnly />
    ),
    editComponent: props => (
      <textarea
        value={props.value || ""}
        onChange={e => props.onChange(e.target.value)}
      />
    )
  },
  {
    title: "career",
    field: "career",
    render: rowData => <textarea value={rowData.career || ""} readOnly />,
    editComponent: props => (
      <textarea
        value={props.value || ""}
        onChange={e => props.onChange(e.target.value)}
      />
    )
  }
];

export default ({ commitments, actor }, ...props) => {
  const classes = useStyles(props);
  const { enqueueSnackbar } = useSnackbar();

  const [createActor] = useMutation(CREATE_ACTOR, {
    refetchQueries: [{ query: GET_ALL_ACTORS_TREE }]
  });

  const addRow = row => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        createActor({ variables: row }).then(r =>
          enqueueSnackbar(
            r.errors
              ? `Failed to add an actor: ${r.errors}`
              : `New actor added: ${r.data.CreateActor.name} (${r.data.CreateActor.id})`
          )
        );
        resolve();
      }, 1000);
    });
  };

  const [updateActor] = useMutation(UPDATE_ACTOR, {
    refetchQueries: [{ query: GET_ALL_ACTORS_TREE }]
  });

  const updateRow = (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        updateActor({ variables: newRow }).then(r =>
          enqueueSnackbar(
            r.errors
              ? `Failed to update the actor: ${r.errors}`
              : `The actor updated: ${r.data.UpdateActor.name} (${r.data.UpdateActor.id})`
          )
        );
        resolve();
      }, 1000);
    });

  const [deleteActor] = useMutation(DELETE_ACTOR, {
    refetchQueries: [{ query: GET_ALL_ACTORS_TREE }]
  });

  const deleteRow = oldRow =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteActor({ variables: oldRow }).then(r =>
          enqueueSnackbar(
            r.errors
              ? `Failed to delete the actor: ${r.errors}`
              : `The actor deleted: ${r.data.DeleteActor.name} (${r.data.DeleteActor.id})`
          )
        );
        resolve();
      }, 1000);
    });

  const detailPanel = row => {
    console.log({ row });
    return <CellTable cells={row.commitments} actor={row} />;
  };

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Actors"
        columns={schema}
        data={actors}
        editable={{
          onRowAdd: addRow,
          onRowUpdate: updateRow,
          onRowDelete: deleteRow
        }}
        detailPanel={detailPanel}
      />
    </div>
  );
};
