import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

export default ({name, label, selections = []}) => (
  <FormControl>
    <InputLabel htmlFor="generic-selector">{label}</InputLabel>
    <Select name={name} inputProps={{id: 'generic-selector'}}>
      {
        selections.map(it => (
          <MenuItem value={it.value}>{it.content}</MenuItem>
        ))
      }
    </Select>
  </FormControl>
)
