import React from 'react';
import {CREATE_CELL} from '../utils/model';
import {useMutation} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import AutoForm from 'uniforms-material/AutoForm';
import AutoFields from 'uniforms-material/AutoFields';
import LongTextField from 'uniforms-material/LongTextField';
import SubmitField from 'uniforms-material/SubmitField';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  name: String,
  type: {
    type: String,
    allowedValues: ['INNER', 'OUTER'],
  },
  purposes: {
    type: String,
    optional: true,
  },
  offers: {
    type: String,
    optional: true,
  },
});

export default ({onClose}) => {
  const [createCell] = useMutation(CREATE_CELL);
  const {enqueueSnackbar} = useSnackbar();

  const bridge = new SimpleSchema2Bridge(schema);
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
