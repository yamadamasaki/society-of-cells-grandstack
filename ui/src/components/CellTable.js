import React from "react";
import MaterialTable from "material-table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {cellTypesWithLabel, CREATE_CELL, DELETE_CELL, GET_ALL_CELLS_TREE, UPDATE_CELL} from "../utils/model"
import {useMutation} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

const schema = [
  {title: 'name', field: 'name'},
  {title: 'type', field: 'type', lookup: cellTypesWithLabel},
  {
    title: 'purposes', field: 'purposes',
    render: rowData => (
      <textarea value={rowData.purposes || ""} readOnly/>
    ),
    editComponent: props => (
      <textarea value={props.value || ""} onChange={e => props.onChange(e.target.value)}/>
    )
  },
  {
    title: 'offers', field: 'offers',
    render: rowData => (
      <textarea value={rowData.offers || ""} readOnly/>
    ),
    editComponent: props => (
      <textarea value={props.value || ""} onChange={e => props.onChange(e.target.value)}/>
    )
  },
];

export default ({cells, actor = null, organization = null}, ...props) => {
  const classes = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();

  const [createCell] = useMutation(
    CREATE_CELL, {
      refetchQueries: [{query: GET_ALL_CELLS_TREE}],
    });

  const addRow = row => {
    return (
      new Promise((resolve, reject) => {
        setTimeout(() => {
          createCell({variables: row})
            .then(r => enqueueSnackbar(r.errors
              ? `Failed to add an cell: ${r.errors}`
              : `New cell added: ${r.data.CreateCell.name} (${r.data.CreateCell.id})`));
          resolve()
        }, 1000)
      })
    );
  };

  const [updateCell] = useMutation(
    UPDATE_CELL, {
      refetchQueries: [{query: GET_ALL_CELLS_TREE}],
    }
  );

  const updateRow = (newRow, oldRow) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        updateCell({variables: newRow})
          .then(r => enqueueSnackbar(r.errors
            ? `Failed to update the cell: ${r.errors}`
            : `The cell updated: ${r.data.UpdateCell.name} (${r.data.UpdateCell.id})`));
        resolve()
      }, 1000)
    })
  );

  const [deleteCell] = useMutation(
    DELETE_CELL, {
      refetchQueries: [{query: GET_ALL_CELLS_TREE}],
    }
  );

  const deleteRow = oldRow => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        deleteCell({variables: oldRow})
          .then(r => enqueueSnackbar(r.errors
            ? `Failed to delete the cell: ${r.errors}`
            : `The cell deleted: ${r.data.DeleteCell.name} (${r.data.DeleteCell.id})`));
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
        title='Cells'
        columns={schema}
        data={cells}
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
