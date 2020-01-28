import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateMarketForm from "./CreateMarketForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-market-dialog">
    <DialogTitle id="create-market-dialog">Create an Market</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ひとつのセルを創ります
      </DialogContentText>
      <CreateMarketForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
