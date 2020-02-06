import React from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default ({label = "Actor", name = "actor", actors = {}}) => {
  return (
    <FormControl>
      <InputLabel htmlFor="actor-select">{label}</InputLabel>
      <Select name={name} inputProps={{id: 'actor-select'}}>
        {
          actors.Actor.map((it, index) => (
            <MenuItem value={it.id} key={index}>{it.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
