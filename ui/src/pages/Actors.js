import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {useSnackbar} from "notistack";
import {LinearProgress} from "@material-ui/core";
import ActorTable from "../components/ActorTable";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

export default props => {
  const classes = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();
  const {loading, data} = useQuery(
    gql`query
    {Actor {id, name, position, qualification, career, commitments
    {Cell {id, name, type, purposes, offers, contracts
    {Organization {name, type}}}}}}`,
    {onError: e => enqueueSnackbar("GET_ALL_ACTORS failed")});

  return (
    loading ? <LinearProgress/> :
      <ActorTable actors={data ? data.Actor : []} className={classes.root}/>
  )
}
