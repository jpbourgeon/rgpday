// eslint-disable
// this is an auto generated file. This will be overwritten

export const sendEmail = `query SendEmail(
  $from: String
  $to: String
  $sender: String
  $content: String
  $subject: String
  $recaptcha: String
) {
  sendEmail(
    from: $from
    to: $to
    sender: $sender
    content: $content
    subject: $subject
    recaptcha: $recaptcha
  )
}
`;
export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
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
export const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      contact
      numberOfParticipants
      RGPDay
      startDate
      endDate
    }
    nextToken
  }
}
`;
export const getConfig = `query GetConfig($id: ID!) {
  getConfig(id: $id) {
    id
    name
    value
  }
}
`;
export const listConfigs = `query ListConfigs(
  $filter: ModelConfigFilterInput
  $limit: Int
  $nextToken: String
) {
  listConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      value
    }
    nextToken
  }
}
`;
