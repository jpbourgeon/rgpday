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
    description
    searchable
    sessions {
      items {
        id
        description
        contact
        numberOfParticipants
        RGPDay
        startDate
        endDate
        searchable
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
      description
      searchable
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
    description
    contact
    numberOfParticipants
    RGPDay
    startDate
    endDate
    searchable
    scenario {
      id
      description
      searchable
      sessions {
        nextToken
      }
    }
    teams {
      items {
        id
        name
        initials
        color
        searchable
      }
      nextToken
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
      description
      contact
      numberOfParticipants
      RGPDay
      startDate
      endDate
      searchable
      scenario {
        id
        description
        searchable
      }
      teams {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    name
    initials
    color
    searchable
    session {
      id
      description
      contact
      numberOfParticipants
      RGPDay
      startDate
      endDate
      searchable
      scenario {
        id
        description
        searchable
      }
      teams {
        nextToken
      }
    }
  }
}
`;
export const listTeams = `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      initials
      color
      searchable
      session {
        id
        description
        contact
        numberOfParticipants
        RGPDay
        startDate
        endDate
        searchable
      }
    }
    nextToken
  }
}
`;
export const getConfig = `query GetConfig($id: ID!) {
  getConfig(id: $id) {
    id
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
      value
    }
    nextToken
  }
}
`;
