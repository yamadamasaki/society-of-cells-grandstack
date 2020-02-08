import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateContractForm from "./CreateContractForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-contract-dialog">
    <DialogTitle id="create-contract-dialog">Create an Contract</DialogTitle>
    <DialogContent>
      <DialogContentText>
        セルがが社外の組織とコントラクトします
      </DialogContentText>
      <CreateContractForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
