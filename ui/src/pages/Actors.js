import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MaterialTable from "material-table";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useSnackbar} from "notistack";
import {LinearProgress} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

const schema = [
  {title: 'name', field:'name'},
  {title: 'position', field:'position'},
  {title: 'qualification', field:'qualification'},
  {title: 'career', field:'career'},
]

export default props => {
  const classes = useStyles(props)
  const {enqueueSnackbar} = useSnackbar();
  const {loading, data} = useQuery(
    gql`query {Actor {id, name, position, qualification, career}}`,
    {onError: e => enqueueSnackbar("GET_ALL_ACTORS failed")})

  return (
    <div className={classes.root}>
      {
        loading ? <LinearProgress/> :
          <MaterialTable columns={schema} data={data.Actor} title='Actors'/>
      }
    </div>
  )
}
