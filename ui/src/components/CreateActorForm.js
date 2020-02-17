import { Form, Formik, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_ACTOR, positions } from "../utils/model";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createActor] = useMutation(CREATE_ACTOR);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: "",
        position: ""
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = "Required";
        if (!values.position) errors.position = "Required";
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          createActor({ variables: values }).then(r =>
            enqueueSnackbar(
              r.errors
                ? `Failed to add an actor: ${r.errors}`
                : `New actor added: ${r.data.CreateActor.name} (${r.data.CreateActor.id})`
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
            <InputLabel htmlFor="actor-position">Position</InputLabel>
            <Field
              component={Select}
              name="position"
              select={positions[0]}
              variant="filled"
              inputProps={{ id: "actor-position" }}
            >
              {positions.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <br />
          <Field
            component={TextField}
            name="qualification"
            type="text"
            label="Qualification"
            variant="outlined"
            multiline
          />
          <br />
          <Field
            component={TextField}
            name="career"
            type="text"
            label="Career"
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
