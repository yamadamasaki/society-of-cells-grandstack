import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_CELL, cellTypes as types } from "../utils/model";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createCell] = useMutation(CREATE_CELL);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: "",
        type: ""
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = "Required";
        if (!values.type) errors.type = "Required";
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          createCell({ variables: values }).then(r =>
            enqueueSnackbar(
              r.errors
                ? `Failed to add an cell: ${r.errors}`
                : `New cell added: ${r.data.CreateCell.name} (${r.data.CreateCell.id})`
            )
          );
          props.onClose(true, values);
        });
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="name"
            type="text"
            label="Name"
            variant="filled"
          />
          <br />
          <FormControl>
            <InputLabel htmlFor="cell-type">Type</InputLabel>
            <Field
              component={Select}
              name="type"
              select={types[0]}
              variant="filled"
            >
              {types.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <br />
          <Field
            component={TextField}
            name="purposes"
            type="text"
            label="Purposes"
            variant="outlined"
            multiline
          />
          <br />
          <Field
            component={TextField}
            name="offers"
            type="text"
            label="Offers"
            variant="outlined"
            multiline
          />
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button color="primary" disabled={isSubmitting} onClick={submitForm}>
            Submit
          </Button>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};
