import gql from "graphql-tag";

export const positions = [
  'EXECUTIVE_FACILITATOR',
  'PROJECT_FACILITATOR',
  'ASSISTANT_FACILITATOR',
  'PROFESSIONAL',
  'EXPERT_STAFF',
  'SENIOR_STAFF',
  'ASSISTANT_STAFF',
  'NEW_FACE'
];

export const positionsWithLabel = {
  EXECUTIVE_FACILITATOR: 'EXECUTIVE_FACILITATOR',
  PROJECT_FACILITATOR: 'PROJECT_FACILITATOR',
  ASSISTANT_FACILITATOR: 'ASSISTANT_FACILITATOR',
  PROFESSIONAL: 'PROFESSIONAL',
  EXPERT_STAFF: 'EXPERT_STAFF',
  SENIOR_STAFF: 'SENIOR_STAFF',
  ASSISTANT_STAFF: 'ASSISTANT_STAFF',
  NEW_FACE: 'NEW_FACE'
};

export const organizationTypes = [
  'SELF',
  'SUPPLIER',
  'CUSTOMER'
];

export const cellTypes = [
  'INNER',
  'OUTER'
];

export const cellTypesWithLabel = {
  INNER: 'INNER',
  OUTER: 'OUTER'
};

export const appraisal = [
  'NEGATIVE',
  'NEUTRAL',
  'POSITIVE'
];

export const CREATE_ACTOR = gql`
  mutation CreateActor($name: String!, $position: ActorPosition!, $qualification: String, $career: String) {
    CreateActor(name: $name, position: $position, qualification: $qualification, career: $career) {
      id
      name
    }
  }
`;

export const UPDATE_ACTOR = gql`
  mutation UpdateActor($id: ID!, $name: String, $position: ActorPosition, $qualification: String, $career: String) {
    UpdateActor(id: $id, name: $name, position: $position, qualification: $qualification, career: $career) {
      id
      name
    }
  }
`;

export const DELETE_ACTOR = gql`
  mutation DeleteActor($id: ID!) {
    DeleteActor(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_CELL = gql`
  mutation CreateCell($name: String!, $type: CellType!, $purposes: String, $offers: String) {
    CreateCell(name: $name, type: $type, purposes: $purposes, offers: $offers) {
      id
      name
    }
  }
`;

export const UPDATE_CELL = gql`
  mutation UpdateCell($id: ID!, $name: String,  $type: CellType!, $purposes: String, $offers: String) {
    UpdateCell(id: $id, name: $name, type: $type, purposes: $purposes, offers: $offers) {
      id
      name
    }
  }
`;

export const DELETE_CELL = gql`
  mutation DeleteCell($id: ID!) {
    DeleteCell(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($name: String!, $type: OrganizationType!) {
    CreateOrganization(name: $name, type: $type) {
      id
      name
    }
  }
`;

export const CREATE_MARKET = gql`
  mutation CreateMarket($name: String!) {
    CreateMarket(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_COMMITMENT = gql`
  mutation AddCommitments($from: _ActorInput!, $to: _CellInput!, $data: _CommitmentInput!) {
    AddActorCommitments(from: $from, to: $to, data: $data) {
      from { id, name }
      to { id, name }
    }
    AddCellCommitments(from: $from, to: $to, data: $data) {
      from { id, name }
      to { id, name }
    }
  }
`;

export const CREATE_CONTRACT = gql`
  mutation AddCellContracts($from: _CellInput!, $to: _OrganizationInput!, $data: _ContractInput!) {
    AddCellContracts(from: $from, to: $to, data: $data) {
      from { id, name }
      to { id, name }
    }
    AddOrganizationContracts(from: $from, to: $to, data: $data) {
      from { id, name }
      to { id, name }
    }
  }
`;

export const GET_ALL_ACTORS_TREE = gql`
  query
  {Actor {id, name, position, qualification, career, commitments
  {Cell {id, name, type, purposes, offers, contracts
  {Organization {name, type}}}}}}`;

export const GET_ALL_CELLS_TREE = gql`
  query
  {Cell {id, name, type, purposes, offers, contracts
  {Organization {name, type}}}}
`;
