import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Field } from "formik";

export default ({ label = "Cell", name = "cell", cells = {}, variant }) => {
  return (
    <FormControl>
      <InputLabel htmlFor="cell-select">{label}</InputLabel>
      <Field
        component={Select}
        name={name}
        inputProps={{ id: "cell-select" }}
        defaultValue={cells.Cell && cells.Cell[0].id}
        variant={variant}
      >
        {cells.Cell.map((it, index) => (
          <MenuItem value={it.id} key={index}>
            {it.name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
};
