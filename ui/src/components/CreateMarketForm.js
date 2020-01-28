import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {CREATE_MARKET} from "../utils/model"
import {useMutation} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createMarket, _] = useMutation(CREATE_MARKET);
  const {enqueueSnackbar} = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required';
        return errors
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          setSubmitting(false);
          createMarket({variables: values})
            .then(r => enqueueSnackbar(r.errors
              ? `Failed to add a market: ${r.errors}`
              : `New market added: ${r.data.CreateMarket.name} (${r.data.CreateMarket.id})`));
          props.onClose(true, values)
        })
      }}>
      {({submitForm, isSubmitting}) => (
        <Form>
          <TextField name="name" type="text" label="Name" variant="standard"/>
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
