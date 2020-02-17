import React from "react";
import { CREATE_ACTOR } from "../utils/model";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { AutoForm } from "uniforms-material";
import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

export default ({ onClose }) => {
  const [createActor] = useMutation(CREATE_ACTOR);
  const { enqueueSnackbar } = useSnackbar();

  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const schema = {
    title: "Actor",
    type: "object",
    properties: {
      name: { type: "string" },
      position: {
        type: "string",
        enum: [
          "EXECUTIVE_FACILITATOR",
          "PROJECT_FACILITATOR",
          "ASSISTANT_FACILITATOR",
          "PROFESSIONAL",
          "EXPERT_STAFF",
          "SENIOR_STAFF",
          "ASSISTANT_STAFF",
          "NEW_FACE"
        ]
      },
      qualification: { type: "string" },
      career: { type: "string" }
    },
    required: ["name", "position"]
  };
  const createValidator = schema => {
    const validator = ajv.compile(schema);
    return model => {
      validator(model);

      if (validator.errors && validator.errors.length)
        throw { details: validator.errors };
    };
  };
  const schemaValidator = createValidator(schema);
  const bridge = new JSONSchemaBridge(schema, schemaValidator);
  const onSubmit = model => {
    createActor({ variables: model }).then(r => {
      enqueueSnackbar(
        r.errors
          ? `Failed to add an actor: ${r.errors}`
          : `New actor added: ${r.data.CreateActor.name} (${r.data.CreateActor.id})`
      );
      onClose();
    });
  };

  return <AutoForm schema={bridge} onSubmit={onSubmit} />;
};
