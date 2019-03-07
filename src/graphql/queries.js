// eslint-disable
// this is an auto generated file. This will be overwritten

export const sendMail = `query SendMail(
  $sender: String
  $content: String
  $subject: String
  $recaptcha: String
) {
  sendMail(
    sender: $sender
    content: $content
    subject: $subject
    recaptcha: $recaptcha
  )
}
`;
export const getScenario = `query GetScenario($id: ID!) {
  getScenario(id: $id) {
    id
    name
    description
    sessions {
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
}
`;
export const listScenarios = `query ListScenarios(
  $filter: ModelScenarioFilterInput
  $limit: Int
  $nextToken: String
) {
  listScenarios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      sessions {
        nextToken
      }
    }
    nextToken
  }
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
    scenario {
      id
      name
      description
      sessions {
        nextToken
      }
    }
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
      scenario {
        id
        name
        description
      }
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
