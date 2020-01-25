import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

import {positions} from "../utils/model"

export default props => {
  const onCancel = () => props.onClose(true, {});
  return (
    <Formik
      initialValues={{
        name: '',
        position: ''
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required';
        if (!values.position) errors.position = 'Required';
        return errors
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          setSubmitting(false);
          props.onClose(true, values)
        })
      }}>
      {({submitForm, isSubmitting}) => (
        <Form>
          <TextField name="name" type="text" label="Name" variant="standard"/>
          <br/>
          <TextField variant="standard" name="position" select label="Position">
            {positions.map((value, index) => (
              <MenuItem key={index} value={value}>{value}</MenuItem>
            ))}
          </TextField>
          <br/>
          <TextField name="qualification" type="text" label="Qualification" variant="standard" multiline/>
          <br/>
          <TextField name="career" type="text" label="Career" variant="standard" multiline/>
          {isSubmitting && <LinearProgress/>}
          <br/>
          <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
          <Button onClick={onCancel} color="primary">Cancel</Button>
        </Form>
      )}
    </Formik>
  )
}
