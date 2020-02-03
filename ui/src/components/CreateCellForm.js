import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {CREATE_CELL, cellTypes as types} from "../utils/model"
import {useMutation} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createCell,] = useMutation(CREATE_CELL);
  const {enqueueSnackbar} = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: '',
        type: ''
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required';
        if (!values.type) errors.type = 'Required';
        return errors
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          setSubmitting(false);
          createCell({variables: values})
            .then(r => enqueueSnackbar(r.errors
              ? `Failed to add an cell: ${r.errors}`
              : `New cell added: ${r.data.CreateCell.name} (${r.data.CreateCell.id})`));
          props.onClose(true, values)
        })
      }}>
      {({submitForm, isSubmitting}) => (
        <Form>
          <TextField name="name" type="text" label="Name" variant="standard"/>
          <br/>
          <TextField variant="standard" name="type" select label="Type">
            {types.map((value, index) => (
              <MenuItem key={index} value={value}>{value}</MenuItem>
            ))}
          </TextField>
          <br/>
          <TextField name="purposes" type="text" label="Purposes" variant="standard" multiline/>
          <br/>
          <TextField name="offers" type="text" label="Offers" variant="standard" multiline/>
          <br/>
          {isSubmitting && <LinearProgress/>}
          <br/>
          <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
          <Button onClick={onCancel} color="primary">Cancel</Button>
        </Form>
      )}
    </Formik>
  )
}
