import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateActorForm from "./CreateActorForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-actor-dialog">
    <DialogTitle id="create-actor-dialog">Create an Actor</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ひとりのひとを創ります
      </DialogContentText>
      <CreateActorForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
