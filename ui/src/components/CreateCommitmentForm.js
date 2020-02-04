import {Form, Formik} from "formik";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import React from "react";
import {CREATE_COMMITMENT} from "../utils/model"
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useSnackbar} from "notistack";
import {DatePicker} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import gql from "graphql-tag"
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import {Select} from "formik-material-ui";
import MenuItem from "@material-ui/core/MenuItem";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createCommitment,] = useMutation(CREATE_COMMITMENT);
  const {enqueueSnackbar} = useSnackbar();
  const {loading: l_a, data: actors} = useQuery(gql`query {Actor {id, name}}`, {onError: e => enqueueSnackbar("GET_ALL_ACTORS failed")});
  const {loading: l_c, data: cells} = useQuery(gql`query {Cell {id, name}}`, {onError: e => enqueueSnackbar("GET_ALL_CELLS failed")});

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          fromDate: new Date()
        }}
        validate={values => {
          const errors = {};
          if (!values.fromDate) errors.fromDate = 'Required';
          if (!values.from) errors.from = 'Required';
          if (!values.to) errors.to = 'Required';
          return errors
        }}
        onSubmit={(values, {setSubmitting}) => {
          const date = values.fromDate;
          values.data = {fromDate: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}};
          values.from = {id: values.from};
          values.to = {id: values.to};
          setTimeout(() => {
            setSubmitting(false);
            createCommitment({variables: values})
              .then(r => enqueueSnackbar(r.errors
                ? `Failed to add an commitment: ${r.errors}`
                : `New commitment added: ${r.data.AddActorCommitments.from.name} => ${r.data.AddActorCommitments.to.name}`));
            props.onClose(true, values)
          })
        }}>
        {({submitForm, isSubmitting}) => (
          <React.Fragment>
            {(l_a || l_c) && <LinearProgress/>}
            {(actors && cells) && !(l_a || l_c) && (
              <Form>
                <FormControl>
                  <InputLabel htmlFor="from-select">Actor</InputLabel>
                  <Select name="from" inputProps={{id: 'from-select'}}>
                    {
                      actors.Actor.map((it, index) => (
                        <MenuItem value={it.id} key={index}>{it.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <br/>
                <FormControl>
                  <InputLabel htmlFor="to-select">Cell</InputLabel>
                  <Select name="to" inputProps={{id: 'to-select'}}>
                    {
                      cells.Cell.map((it, index) => (
                        <MenuItem value={it.id} key={index}>{it.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <br/>
                <DatePicker name="fromDate" label="From Date"/>
                <br/>
                {isSubmitting && <LinearProgress/>}
                <br/>
                <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
                <Button onClick={onCancel} color="primary">Cancel</Button>
              </Form>
            )}
          </React.Fragment>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}
