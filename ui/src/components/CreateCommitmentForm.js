import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import gql from 'graphql-tag';
import {CREATE_COMMITMENT} from '../utils/model';
import {
  AutoFields,
  AutoForm,
  ErrorsField,
  LongTextField,
  SelectField,
  SubmitField,
} from 'uniforms-material';
import {LinearProgress} from '@material-ui/core';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import DatePickerField from './DatePickerField';
import {jsDate2cypherDate} from '../utils/datetime';

const schema = new SimpleSchema({
  from: String,
  to: String,
  fromDate: {
    type: Date,
    uniforms: DatePickerField,
  },
  toDate: {
    type: Date,
    optional: true,
    uniforms: DatePickerField,
  },
  paymentBase: {
    type: String,
    optional: true,
    allowedValues: ['time', 'capability'],
  },
  utilization: {
    type: SimpleSchema.Integer,
    optional: true,
    min: 0,
    max: 100,
  },
  rate: {
    type: SimpleSchema.Integer,
    optional: true,
    min: 0,
  },
  asFacilitator: Boolean,
  isReservation: Boolean,
  description: {
    type: String,
    optional: true,
    uniforms: LongTextField,
  },
});

export default ({onClose}) => {
  const [createCommitment] = useMutation(CREATE_COMMITMENT);
  const {enqueueSnackbar} = useSnackbar();

  const {loading: l_a, data: actors} = useQuery(
      gql`query {Actor {
          id
          name
      }}`,
      {onError: e => enqueueSnackbar('GET_ALL_ACTORS failed')},
  );
  const {loading: l_c, data: cells} = useQuery(
      gql`query {Cell {
          id
          name
      }}`,
      {onError: e => enqueueSnackbar('GET_ALL_CELLS failed')},
  );

  const bridge = new SimpleSchema2Bridge(schema);
  const onSubmit = model => {
    const variables = {
      from: {id: model.from},
      to: {id: model.to},
      data: {
        fromDate: jsDate2cypherDate(model.fromDate),
        toDate: jsDate2cypherDate(model.toDate),
        paymentBase: model.paymentBase,
        utilization: model.utilization,
        rate: model.rate,
        asFacilitator: model.asFacilitator,
        isReservation: model.isReservation,
        description: model.description,
      }
    }
    createCommitment({variables}).then(r => {
      enqueueSnackbar(
          r.errors ?
              `Failed to add a commitment: ${r.errors}` :
              `New commitment added: ${r.data.AddActorCommitments.from.name} to ${r.data.AddActorCommitments.to.name}`,
      );
    });
    onClose();
  };

  const modelTemplate = {
    fromDate: new Date(),
    asFacilitator: false,
    isReservation: false,
  };

  return (
      (l_c || l_a) ? <LinearProgress/> :
          <AutoForm schema={bridge}
                    onSubmit={onSubmit}
                    model={modelTemplate}>
            <SelectField name="from"
                         allowedValues={actors.Actor.map(it => it.id)}
                         transform={value => actors.Actor.find(
                             it => it.id === value).name}/>
            <SelectField name="to" allowedValues={cells.Cell.map(it => it.id)}
                         transform={value => cells.Cell.find(
                             it => it.id === value).name}/>
            <AutoFields fields={[
              'fromDate',
              'toDate',
              'paymentBase',
              'utilization',
              'rate',
              'asFacilitator',
              'isReservation',
              'description',
            ]}/>
            <SubmitField/>
            <ErrorsField/>
          </AutoForm>
  );
};
