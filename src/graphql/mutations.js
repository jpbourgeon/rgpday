// eslint-disable
// this is an auto generated file. This will be overwritten

export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
    id
    name
    description
    contact
    numberOfParticipants
    RGPDay
    startDate
    endDate
  }
}
`;
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
    id
    name
    description
    contact
    numberOfParticipants
    RGPDay
    startDate
    endDate
  }
}
`;
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
    id
    name
    description
    contact
    numberOfParticipants
    RGPDay
    startDate
    endDate
  }
}
`;
export const createConfig = `mutation CreateConfig($input: CreateConfigInput!) {
  createConfig(input: $input) {
    id
    name
    value
  }
}
`;
export const updateConfig = `mutation UpdateConfig($input: UpdateConfigInput!) {
  updateConfig(input: $input) {
    id
    name
    value
  }
}
`;
export const deleteConfig = `mutation DeleteConfig($input: DeleteConfigInput!) {
  deleteConfig(input: $input) {
    id
    name
    value
  }
}
`;
