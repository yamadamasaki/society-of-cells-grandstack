import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { Select } from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Field } from "formik";

export default ({ label = "Actor", name = "actor", actors = {}, variant }) => {
  return (
    <FormControl>
      <InputLabel htmlFor="actor-select">{label}</InputLabel>
      <Field
        component={Select}
        name={name}
        inputProps={{ id: "actor-select" }}
        defaultValue={actors.Actor && actors.Actor[0].id}
        variant={variant}
      >
        {actors.Actor.map((it, index) => (
          <MenuItem value={it.id} key={index}>
            {it.name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  );
};
