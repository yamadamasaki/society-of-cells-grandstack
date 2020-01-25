import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";

export default props => {
  const onCancel = () => props.onClose(true, {});
  return (
    <Formik
      initialValues={{name: ''}}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required';
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
          {isSubmitting && <LinearProgress/>}
          <br/>
          <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
          <Button onClick={onCancel} color="primary">Cancel</Button>
        </Form>
      )}
    </Formik>
  )
}
