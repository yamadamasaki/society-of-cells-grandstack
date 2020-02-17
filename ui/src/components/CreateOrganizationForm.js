import React from "react";
import { CREATE_ORGANIZATION } from "../utils/model";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { AutoForm } from "uniforms-material";

export default ({ onClose }) => {
  const [createOrganization] = useMutation(CREATE_ORGANIZATION);
  const { enqueueSnackbar } = useSnackbar();

  const ajv = new Ajv({ allErrors: true, useDefaults: true });
  const schema = {
    title: "Organization",
    type: "object",
    properties: {
      name: { type: "string" },
      type: {
        type: "string",
        enum: [
          //'SELF',
          "SUPPLIER",
          "CUSTOMER"
          //'MARKET'
        ]
      }
    }
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
    createOrganization({ variables: model }).then(r => {
      enqueueSnackbar(
        r.errors
          ? `Failed to add an organization: ${r.errors}`
          : `New organization added: ${r.data.CreateOrganization.name} (${r.data.CreateOrganization.id})`
      );
      onClose();
    });
  };

  return <AutoForm schema={bridge} onSubmit={onSubmit} />;
};
