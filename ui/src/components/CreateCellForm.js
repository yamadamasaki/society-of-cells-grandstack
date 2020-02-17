import React from 'react';
import {CREATE_CELL} from '../utils/model';
import {useMutation} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';
import {AutoForm} from 'uniforms-material';
import AutoFields from 'uniforms-material/AutoFields';
import LongTextField from 'uniforms-material/LongTextField';
import SubmitField from 'uniforms-material/SubmitField';

export default ({onClose}) => {
  const [createCell] = useMutation(CREATE_CELL);
  const {enqueueSnackbar} = useSnackbar();

  const ajv = new Ajv({allErrors: true, useDefaults: true});
  const schema = {
    title: 'Cell',
    type: 'object',
    properties: {
      name: {type: 'string'},
      type: {
        type: 'string',
        enum: ['INNER', 'OUTER'],
      },
      purposes: {type: 'string'},
      offers: {type: 'string'},
    },
    required: ['name', 'type'],
  };
  const createValidator = schema => {
    const validator = ajv.compile(schema);
    return model => {
      validator(model);

      if (validator.errors && validator.errors.length) {
        // eslint-disable-next-line
        throw {details: validator.errors};
      }
    };
  };
  const schemaValidator = createValidator(schema);
  const bridge = new JSONSchemaBridge(schema, schemaValidator);
  const onSubmit = model => {
    createCell({variables: model}).then(r => {
      enqueueSnackbar(
          r.errors
              ?
              `Failed to add an cell: ${r.errors}`
              :
              `New cell added: ${r.data.CreateCell.name} (${r.data.CreateCell.id})`,
      );
      onClose();
    });
  };

  return (
      <AutoForm schema={bridge} onSubmit={onSubmit}>
        <AutoFields fields={['name', 'type']}/>
        <LongTextField name="purposes"/>
        <LongTextField name="offers"/>
        <SubmitField/>
      </AutoForm>
  );
};
