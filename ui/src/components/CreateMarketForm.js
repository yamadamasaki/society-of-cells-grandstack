import React from 'react';
import {CREATE_MARKET} from '../utils/model';
import {useMutation} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import SimpleSchema from 'simpl-schema';
import {AutoForm} from 'uniforms-material';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  name: String,
});

export default ({onClose}) => {
  const [createMarket] = useMutation(CREATE_MARKET);
  const {enqueueSnackbar} = useSnackbar();

  const bridge = new SimpleSchema2Bridge(schema);
  const onSubmit = model => {
    createMarket({variables: model}).then(r => {
      enqueueSnackbar(
          r.errors ?
              `Failed to add a market: ${r.errors}` :
              `New market added: ${r.data.CreateMarket.name} (${r.data.CreateMarket.id})`,
      );
    });
    onClose();
  };
  return (
      <AutoForm schema={bridge} onSubmit={onSubmit}/>
  );
};
