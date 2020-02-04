import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateCommitmentForm from "./CreateCommitmentForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-commitment-dialog">
    <DialogTitle id="create-commitment-dialog">Create an Commitment</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ひとがセルにコミットメントします
      </DialogContentText>
      <CreateCommitmentForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
