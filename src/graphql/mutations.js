// eslint-disable
// this is an auto generated file. This will be overwritten

export const createScenario = `mutation CreateScenario($input: CreateScenarioInput!) {
  createScenario(input: $input) {
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
export const updateScenario = `mutation UpdateScenario($input: UpdateScenarioInput!) {
  updateScenario(input: $input) {
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
export const deleteScenario = `mutation DeleteScenario($input: DeleteScenarioInput!) {
  deleteScenario(input: $input) {
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
