// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateScenario = `subscription OnCreateScenario {
  onCreateScenario {
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
export const onUpdateScenario = `subscription OnUpdateScenario {
  onUpdateScenario {
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
export const onDeleteScenario = `subscription OnDeleteScenario {
  onDeleteScenario {
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
export const onCreateSession = `subscription OnCreateSession {
  onCreateSession {
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
export const onUpdateSession = `subscription OnUpdateSession {
  onUpdateSession {
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
export const onDeleteSession = `subscription OnDeleteSession {
  onDeleteSession {
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
export const onCreateConfig = `subscription OnCreateConfig {
  onCreateConfig {
    id
    name
    value
  }
}
`;
export const onUpdateConfig = `subscription OnUpdateConfig {
  onUpdateConfig {
    id
    name
    value
  }
}
`;
export const onDeleteConfig = `subscription OnDeleteConfig {
  onDeleteConfig {
    id
    name
    value
  }
}
`;
