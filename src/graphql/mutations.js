// eslint-disable
// this is an auto generated file. This will be overwritten

export const createScenario = `mutation CreateScenario($input: CreateScenarioInput!) {
  createScenario(input: $input) {
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
export const updateScenario = `mutation UpdateScenario($input: UpdateScenarioInput!) {
  updateScenario(input: $input) {
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
export const deleteScenario = `mutation DeleteScenario($input: DeleteScenarioInput!) {
  deleteScenario(input: $input) {
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
export const createPresentation = `mutation CreatePresentation($input: CreatePresentationInput!) {
  createPresentation(input: $input) {
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
export const updatePresentation = `mutation UpdatePresentation($input: UpdatePresentationInput!) {
  updatePresentation(input: $input) {
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
export const deletePresentation = `mutation DeletePresentation($input: DeletePresentationInput!) {
  deletePresentation(input: $input) {
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
export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
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
    presentation {
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
        searchable
      }
      nextToken
    }
  }
}
`;
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
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
    presentation {
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
        searchable
      }
      nextToken
    }
  }
}
`;
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
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
    presentation {
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
        searchable
      }
      nextToken
    }
  }
}
`;
export const createTeam = `mutation CreateTeam($input: CreateTeamInput!) {
  createTeam(input: $input) {
    id
    name
    initials
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
      presentation {
        id
        description
        searchable
      }
      teams {
        nextToken
      }
    }
    quizzes {
      items {
        id
        service
        answers
      }
      nextToken
    }
  }
}
`;
export const updateTeam = `mutation UpdateTeam($input: UpdateTeamInput!) {
  updateTeam(input: $input) {
    id
    name
    initials
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
      presentation {
        id
        description
        searchable
      }
      teams {
        nextToken
      }
    }
    quizzes {
      items {
        id
        service
        answers
      }
      nextToken
    }
  }
}
`;
export const deleteTeam = `mutation DeleteTeam($input: DeleteTeamInput!) {
  deleteTeam(input: $input) {
    id
    name
    initials
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
      presentation {
        id
        description
        searchable
      }
      teams {
        nextToken
      }
    }
    quizzes {
      items {
        id
        service
        answers
      }
      nextToken
    }
  }
}
`;
export const createQuizz = `mutation CreateQuizz($input: CreateQuizzInput!) {
  createQuizz(input: $input) {
    id
    service
    answers
    team {
      id
      name
      initials
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
      quizzes {
        nextToken
      }
    }
  }
}
`;
export const updateQuizz = `mutation UpdateQuizz($input: UpdateQuizzInput!) {
  updateQuizz(input: $input) {
    id
    service
    answers
    team {
      id
      name
      initials
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
      quizzes {
        nextToken
      }
    }
  }
}
`;
export const deleteQuizz = `mutation DeleteQuizz($input: DeleteQuizzInput!) {
  deleteQuizz(input: $input) {
    id
    service
    answers
    team {
      id
      name
      initials
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
      quizzes {
        nextToken
      }
    }
  }
}
`;
export const createConfig = `mutation CreateConfig($input: CreateConfigInput!) {
  createConfig(input: $input) {
    id
    value
  }
}
`;
export const updateConfig = `mutation UpdateConfig($input: UpdateConfigInput!) {
  updateConfig(input: $input) {
    id
    value
  }
}
`;
export const deleteConfig = `mutation DeleteConfig($input: DeleteConfigInput!) {
  deleteConfig(input: $input) {
    id
    value
  }
}
`;
