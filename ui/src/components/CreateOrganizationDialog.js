import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CreateOrganizationForm from "./CreateOrganizationForm";

export default props =>
  <Dialog open={props.open} onClose={props.onClose} aria-labelledby="create-organization-dialog">
    <DialogTitle id="create-organization-dialog">Create an Organization</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ひとつの組織を創ります
      </DialogContentText>
      <CreateOrganizationForm onClose={props.onClose}/>
    </DialogContent>
    <DialogActions>
    </DialogActions>
  </Dialog>
