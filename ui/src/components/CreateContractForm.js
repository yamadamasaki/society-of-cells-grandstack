import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import gql from 'graphql-tag';
import {CREATE_CONTRACT} from '../utils/model';
import {jsDate2cypherDate} from '../utils/datetime';
import SimpleSchema from 'simpl-schema';
import DatePickerField from './DatePickerField';
import {
  AutoFields,
  AutoForm, ErrorsField,
  LongTextField,
  SelectField, SubmitField,
} from 'uniforms-material';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

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
  description: {
    type: String,
    optional: true,
    uniforms: LongTextField,
  },
});

export default ({onClose}) => {
  const [createContract] = useMutation(CREATE_CONTRACT);
  const {enqueueSnackbar} = useSnackbar();
  const {loading: l_c, data: cells} = useQuery(
      gql`query {Cell {id, name}}`,
      {onError: e => enqueueSnackbar('GET_ALL_CELLS failed')});
  const {loading: l_o, data: organizations} = useQuery(
      gql`query {Organization {id, name}}`,
      {onError: e => enqueueSnackbar('GET_ALL_ORGANIZATIONS failed')});

  const bridge = new SimpleSchema2Bridge(schema);
  const onSubmit = model => {
    const variables = {
      from: {id: model.from},
      to: {id: model.to},
      data: {
        fromDate: jsDate2cypherDate(model.fromDate),
        toDate: jsDate2cypherDate(model.toDate),
        description: model.description,
      }
    }
    createContract({variables}).then(r => {
      enqueueSnackbar(
          r.errors ?
              `Failed to add a contract: ${r.errors}` :
              `New contract added: ${r.data.AddCellContracts.from.name} to ${r.data.AddCellContracts.to.name}`,
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
      (l_c || l_o) ? <LinearProgress/> :
          <AutoForm schema={bridge}
                    onSubmit={onSubmit}
                    model={modelTemplate}>
            <SelectField name="from" allowedValues={cells.Cell.map(it => it.id)}
                         transform={value => cells.Cell.find(
                             it => it.id === value).name}/>
            <SelectField name="to"
                         allowedValues={organizations.Organization.map(it => it.id)}
                         transform={value => organizations.Organization.find(
                             it => it.id === value).name}/>
            <AutoFields fields={[
              'fromDate',
              'toDate',
              'description',
            ]}/>
            <SubmitField/>
            <ErrorsField/>
          </AutoForm>
  );
}
