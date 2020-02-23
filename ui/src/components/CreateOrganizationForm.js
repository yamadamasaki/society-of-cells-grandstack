import React from 'react';
import {CREATE_ORGANIZATION} from '../utils/model';
import {useMutation} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import {AutoForm} from 'uniforms-material';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const schema = new SimpleSchema({
  name: String,
  type: {
    type: String,
    allowedValues: [
      //'SELF',
      'SUPPLIER',
      'CUSTOMER',
      //'MARKET'
    ],
  },
});

export default ({onClose}) => {
  const [createOrganization] = useMutation(CREATE_ORGANIZATION);
  const {enqueueSnackbar} = useSnackbar();

  const bridge = new SimpleSchema2Bridge(schema);
  const onSubmit = model => {
    createOrganization({variables: model}).then(r => {
      enqueueSnackbar(
          r.errors
              ?
              `Failed to add an organization: ${r.errors}`
              :
              `New organization added: ${r.data.CreateOrganization.name} (${r.data.CreateOrganization.id})`,
      );
      onClose();
    });
  };

  return <AutoForm schema={bridge} onSubmit={onSubmit}/>;
}
