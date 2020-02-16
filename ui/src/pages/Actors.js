import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useQuery} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";
import {LinearProgress} from "@material-ui/core";
import ActorTable from "../components/ActorTable";
import {GET_ALL_ACTORS_TREE} from "../utils/model";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

export default props => {
  const classes = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();
  const {loading, data} = useQuery(GET_ALL_ACTORS_TREE,
    {onError: e => enqueueSnackbar("GET_ALL_ACTORS_TREE failed")});
  const actors = data ? data.Actor : []

  return (
    loading ? <LinearProgress/> :
      <ActorTable actors={actors} className={classes.root}/>
  )
}
