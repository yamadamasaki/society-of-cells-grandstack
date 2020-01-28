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

export const organizationTypes = [
  'SELF',
  'SUPPLIER',
  'CUSTOMER'
]

export const CREATE_ACTOR = gql`
  mutation CreateActor($name: String!, $position: ActorPosition!, $qualification: String, $career: String) {
    CreateActor(name: $name, position: $position, qualification: $qualification, career: $career) {
      id
      name
    }
  }
`

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($name: String!, $type: OrganizationType!) {
    CreateOrganization(name: $name, type: $type) {
      id
      name
    }
  }
`

export const CREATE_MARKET = gql`
  mutation CreateMarket($name: String!) {
    CreateMarket(name: $name) {
      id
      name
    }
  }
`
