import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default ({label = "Organization", name = "organization", organizations = {}}) => {
  return (
    <FormControl>
      <InputLabel htmlFor="organization-select">{label}</InputLabel>
      <Select name={name} inputProps={{id: 'organization-select'}}>
        {
          organizations.Organization.map((it, index) => (
            <MenuItem value={it.id} key={index}>{it.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
