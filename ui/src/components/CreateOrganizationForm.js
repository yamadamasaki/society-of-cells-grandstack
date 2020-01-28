import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {CREATE_ORGANIZATION, organizationTypes as types} from "../utils/model"
import {useMutation} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createOrganization, _] = useMutation(CREATE_ORGANIZATION);
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
          createOrganization({variables: values})
            .then(r => enqueueSnackbar(r.errors
              ? `Failed to add an organization: ${r.errors}`
              : `New organization added: ${r.data.CreateOrganization.name} (${r.data.CreateOrganization.id})`));
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
          {isSubmitting && <LinearProgress/>}
          <br/>
          <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
          <Button onClick={onCancel} color="primary">Cancel</Button>
        </Form>
      )}
    </Formik>
  )
}
