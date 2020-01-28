import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateCellForm from "./CreateCellForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-cell-dialog">
    <DialogTitle id="create-cell-dialog">Create a Cell</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ひとつのセルを創ります
      </DialogContentText>
      <CreateCellForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
