import React from "react";
import MaterialTable from "material-table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CREATE_ACTOR, DELETE_ACTOR, GET_ALL_ACTORS_TREE, UPDATE_ACTOR} from "../utils/model"
import {useMutation} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

const schema = [
  {title: 'name', field: 'name'},
  {title: 'position', field: 'position'},
  {title: 'qualification', field: 'qualification'},
  {title: 'career', field: 'career'},
];

export default ({actors}, ...props) => {
  const classes = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();

  const [createActor] = useMutation(
    CREATE_ACTOR, {
      refetchQueries: [{query: GET_ALL_ACTORS_TREE}],
    });

  const addRow = row => {
    return (
      new Promise((resolve, reject) => {
        setTimeout(() => {
          createActor({variables: row})
            .then(r => enqueueSnackbar(r.errors
              ? `Failed to add an actor: ${r.errors}`
              : `New actor added: ${r.data.CreateActor.name} (${r.data.CreateActor.id})`));
          resolve()
        }, 1000)
      })
    );
  };

  const [updateActor] = useMutation(
    UPDATE_ACTOR, {
      refetchQueries: [{query: GET_ALL_ACTORS_TREE}],
    }
  );

  const updateRow = (newRow, oldRow) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        updateActor({variables: newRow})
          .then(r => enqueueSnackbar(r.errors
            ? `Failed to update the actor: ${r.errors}`
            : `The actor updated: ${r.data.UpdateActor.name} (${r.data.UpdateActor.id})`));
        resolve()
      }, 1000)
    })
  );

  const [deleteActor] = useMutation(
    DELETE_ACTOR, {
      refetchQueries: [{query: GET_ALL_ACTORS_TREE}],
    }
  );

  const deleteRow = oldRow => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteActor({variables: oldRow})
          .then(r => enqueueSnackbar(r.errors
            ? `Failed to delete the actor: ${r.errors}`
            : `The actor deleted: ${r.data.DeleteActor.name} (${r.data.DeleteActor.id})`));
        resolve()
      }, 1000)
    })
  );

  const detailPanel = row => {
    return (
      <>
        {/*<CellsTable cells={row.commitments}/>*/}
        <h1>CellsTable</h1>
      </>
    )
  };

  return (
    <div className={classes.root}>
      <MaterialTable
        title='Actors'
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
  )
}
