import React from 'react';
import {CREATE_ACTOR} from '../utils/model';
import {useMutation} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import {AutoForm} from 'uniforms-material';
import AutoFields from 'uniforms-material/AutoFields';
import LongTextField from 'uniforms-material/LongTextField';
import SubmitField from 'uniforms-material/SubmitField';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const schema = new SimpleSchema({
  name: String,
  position: {
    type: String,
    allowedValues: [
      'EXECUTIVE_FACILITATOR',
      'PROJECT_FACILITATOR',
      'ASSISTANT_FACILITATOR',
      'PROFESSIONAL',
      'EXPERT_STAFF',
      'SENIOR_STAFF',
      'ASSISTANT_STAFF',
      'NEW_FACE',
    ],
  },
  qualification: {
    type: String,
    optional: true,
  },
  career: {
    type: String,
    optional: true,
  },
});

export default ({onClose}) => {
  const [createActor] = useMutation(CREATE_ACTOR);
  const {enqueueSnackbar} = useSnackbar();

  const bridge = new SimpleSchema2Bridge(schema);
  const onSubmit = model => {
    createActor({variables: model}).then(r => {
      enqueueSnackbar(
          r.errors
              ?
              `Failed to add an actor: ${r.errors}`
              :
              `New actor added: ${r.data.CreateActor.name} (${r.data.CreateActor.id})`,
      );
      onClose();
    });
  };

  return (
      <AutoForm schema={bridge} onSubmit={onSubmit}>
        <AutoFields fields={['name', 'position']}/>
        <LongTextField name="qualification"/>
        <LongTextField name="career"/>
        <SubmitField/>
      </AutoForm>
  );
};
