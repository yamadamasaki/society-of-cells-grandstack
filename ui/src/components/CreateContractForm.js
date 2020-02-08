import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {DatePicker} from 'formik-material-ui-pickers';
import {useSnackbar} from "notistack";
import DateFnsUtils from '@date-io/date-fns'
import gql from "graphql-tag"
import {CREATE_CONTRACT} from "../utils/model"
import OrganizationSelector from "./OrganizationSelector";
import CellSelector from "./CellSelector";
import {jsDate2cypherDate} from "../utils/datetime";
import {pickAll, pickBy} from "ramda";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createContract,] = useMutation(CREATE_CONTRACT);
  const {enqueueSnackbar} = useSnackbar();
  const {loading: l_c, data: cells} = useQuery(gql`query {Cell {id, name}}`, {onError: e => enqueueSnackbar("GET_ALL_CELLS failed")});
  const {loading: l_o, data: organizations} = useQuery(gql`query {Organization {id, name}}`, {onError: e => enqueueSnackbar("GET_ALL_ORGANIZATIONS failed")});

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
          values.from = {id: values.from};
          values.to = {id: values.to};
          values.fromDate = jsDate2cypherDate(values.fromDate);
          values.toDate = jsDate2cypherDate(values.toDate);
          const dataKeys = [
            'fromDate',
            'toDate',
            'description'
          ];
          values.data = pickBy(it => !!it, pickAll(dataKeys, values));
          setTimeout(() => {
            setSubmitting(false);
            createContract({variables: values})
              .then(r => enqueueSnackbar(r.errors
                ? `Failed to add an contract: ${r.errors}`
                : `New contract added: ${r.data.AddCellContracts.from.name} => ${r.data.AddCellContracts.to.name}`));
            props.onClose(true, values)
          })
        }}>
        {({submitForm, isSubmitting}) => (
          <React.Fragment>
            {(l_o || l_c) && <LinearProgress/>}
            {(organizations && cells) && !(l_o || l_c) && (
              <Form>
                <CellSelector name="from" cells={cells} label="Cells"/>
                <br/>
                <OrganizationSelector name="to" organizations={organizations} label="Organizations"/>
                <br/>
                <DatePicker name="fromDate" label="From Date"/>
                <br/>
                <DatePicker name="toDate" label="To Date"/>
                <br/>
                <TextField variant="outlined" name="description" label="Description" multiline rows="4"/>
                <br/>
                <Button color="primary" disabled={isSubmitting} onClick={submitForm}>Submit</Button>
                <Button onClick={onCancel} color="primary">Cancel</Button>
                {isSubmitting && <LinearProgress/>}
                <br/>
              </Form>
            )}
          </React.Fragment>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}
