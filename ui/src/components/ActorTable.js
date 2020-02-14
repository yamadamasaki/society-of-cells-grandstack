import React from "react";
import MaterialTable from "material-table";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

export default ({actors: initialActors}) => {
  const classes = useStyles();

  const addRow = row => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        actors.push(row);
        setActors(actors);
        console.log({actors});
        resolve()
      }, 1000)
    })
  );

  const updateRow = (newRow, oldRow) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = actors.indexOf(oldRow);
        actors[index] = newRow;
        setActors(actors);
        console.log({actors});
        resolve()
      }, 1000)
    })
  );

  const deleteRow = oldRow => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = actors.indexOf(oldRow);
        actors.splice(index, 1);
        setActors(actors);
        console.log({actors});
        resolve()
      }, 1000)
    })
  );

  const [actors, setActors] = React.useState(initialActors);

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
