import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { Field } from "formik";

export default ({ name, label, selections = [], variant }) => (
  <FormControl>
    <InputLabel htmlFor="generic-selector">{label}</InputLabel>
    <Field
      component={Select}
      name={name}
      inputProps={{ id: "generic-selector" }}
      defaultValue={selections[0].value}
      variant={variant}
    >
      {selections.map((it, index) => (
        <MenuItem value={it.value} key={index}>
          {it.content}
        </MenuItem>
      ))}
    </Field>
  </FormControl>
);
