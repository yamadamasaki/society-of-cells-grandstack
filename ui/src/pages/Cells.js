import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useQuery} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";
import {LinearProgress} from "@material-ui/core";
import CellTable from "../components/CellTable";
import {GET_ALL_CELLS_TREE} from "../utils/model";

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

export default props => {
  const classes = useStyles(props);
  const {enqueueSnackbar} = useSnackbar();
  const {loading, data} = useQuery(GET_ALL_CELLS_TREE,
    {onError: e => enqueueSnackbar("GET_ALL_CELLS_TREE failed")});
  const cells = data ? data.Cell : [];

  return (
    loading ? <LinearProgress/> :
      <CellTable cells={cells} className={classes.root}/>
  )
}
