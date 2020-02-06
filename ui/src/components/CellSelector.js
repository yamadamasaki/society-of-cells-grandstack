import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default ({label = "Cell", name = "cell", cells = {}}) => {
  return (
    <FormControl>
      <InputLabel htmlFor="cell-select">{label}</InputLabel>
      <Select name={name} inputProps={{id: 'cell-select'}}>
        {
          cells.Cell.map((it, index) => (
            <MenuItem value={it.id} key={index}>{it.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
