import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Field, Form, Formik } from "formik";
import { Switch, TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { useSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";
import gql from "graphql-tag";
import { CREATE_COMMITMENT } from "../utils/model";
import ActorSelector from "./ActorSelector";
import CellSelector from "./CellSelector";
import GenericSelector from "./GenericSelector";
import { jsDate2cypherDate } from "../utils/datetime";
import { pickAll, pickBy } from "ramda";

export default props => {
  const onCancel = () => props.onClose(true, {});
  const [createCommitment] = useMutation(CREATE_COMMITMENT);
  const { enqueueSnackbar } = useSnackbar();
  const { loading: l_a, data: actors } = useQuery(
    gql`
      query {
        Actor {
          id
          name
        }
      }
    `,
    { onError: e => enqueueSnackbar("GET_ALL_ACTORS failed") }
  );
  const { loading: l_c, data: cells } = useQuery(
    gql`
      query {
        Cell {
          id
          name
        }
      }
    `,
    { onError: e => enqueueSnackbar("GET_ALL_CELLS failed") }
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          fromDate: new Date(),
          asFacilitator: "asFacilitator",
          isReservation: "isReservation"
        }}
        validate={values => {
          console.log("validate", { values });
          const errors = {};
          if (!values.fromDate) errors.fromDate = "Required";
          if (!values.from) errors.from = "Required";
          if (!values.to) errors.to = "Required";
          if (!values.isReservation) errors.isReservation = "Required";
          if (!values.asFacilitator) errors.asFacilitator = "Required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(0, { values });
          values.from = { id: values.from };
          values.to = { id: values.to };
          values.fromDate = jsDate2cypherDate(values.fromDate);
          values.toDate = jsDate2cypherDate(values.toDate);
          console.log(1, { values });
          values.asFacilitator =
            values.asFacilitator &&
            values.asFacilitator.includes("asFacilitator")
              ? true
              : false;
          values.isReservation =
            values.isReservation &&
            values.isReservation.includes("isReservation")
              ? true
              : false;
          const dataKeys = [
            "fromDate",
            "toDate",
            "paymentBase",
            "utilization",
            "rate",
            "asFacilitator",
            "isReservation",
            "description"
          ];
          values.data = pickBy(it => !!it, pickAll(dataKeys, values));
          setTimeout(() => {
            setSubmitting(false);
            createCommitment({ variables: values }).then(r =>
              enqueueSnackbar(
                r.errors
                  ? `Failed to add an commitment: ${r.errors}`
                  : `New commitment added: ${r.data.AddActorCommitments.from.name} => ${r.data.AddActorCommitments.to.name}`
              )
            );
            props.onClose(true, values);
          });
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <React.Fragment>
            {(l_a || l_c) && <LinearProgress />}
            {actors && cells && !(l_a || l_c) && (
              <Form>
                <ActorSelector
                  name="from"
                  actors={actors}
                  label="Actors"
                  variant="filled"
                />
                <br />
                <CellSelector
                  name="to"
                  cells={cells}
                  label="Cells"
                  variant="filled"
                />
                <br />
                <Field
                  component={DatePicker}
                  name="fromDate"
                  label="From Date"
                  variant="filled"
                />
                <br />
                <Field component={DatePicker} name="toDate" label="To Date" />
                <br />
                <GenericSelector
                  name="paymentBase"
                  label="Payment Base"
                  selections={[
                    { value: "time", content: "Time" },
                    { value: "capability", content: "Capability" }
                  ]}
                />
                <br />
                <Field
                  component={TextField}
                  name="utilization"
                  label="Utilization"
                  type="number"
                />
                <span>%</span>
                <br />
                <Field
                  component={TextField}
                  name="rate"
                  label="Rate"
                  type="number"
                />
                <span>pt.</span>
                <br />
                <Field
                  component={Switch}
                  name="asFacilitator"
                  variant="filled"
                  type="checkbox"
                  checked={false}
                  value="asFacilitator"
                />
                <span>As a Facilitator</span>
                <br />
                <Field
                  component={Switch}
                  name="isReservation"
                  variant="filled"
                  type="checkbox"
                  checked={false}
                  value="isReservation"
                />
                <span>Is Reservation</span>
                <br />
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  multiline
                  rows="4"
                  variant="outlined"
                />
                <br />
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
                </Button>
                <Button onClick={onCancel} color="primary">
                  Cancel
                </Button>
                {isSubmitting && <LinearProgress />}
                <br />
              </Form>
            )}
          </React.Fragment>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
};
