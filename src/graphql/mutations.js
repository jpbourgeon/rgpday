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
        startDate
        endDate
        gameOver
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
        startDate
        endDate
        gameOver
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
        startDate
        endDate
        gameOver
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
        startDate
        endDate
        gameOver
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
        startDate
        endDate
        gameOver
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
        startDate
        endDate
        gameOver
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
    startDate
    endDate
    gameOver
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
        numberOfInterviews
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
    startDate
    endDate
    gameOver
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
        numberOfInterviews
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
    startDate
    endDate
    gameOver
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
        numberOfInterviews
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
    numberOfInterviews
    session {
      id
      description
      contact
      numberOfParticipants
      startDate
      endDate
      gameOver
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
        numberOfJokers
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
    numberOfInterviews
    session {
      id
      description
      contact
      numberOfParticipants
      startDate
      endDate
      gameOver
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
        numberOfJokers
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
    numberOfInterviews
    session {
      id
      description
      contact
      numberOfParticipants
      startDate
      endDate
      gameOver
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
        numberOfJokers
      }
      nextToken
    }
  }
}
`;
export const createQuiz = `mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
    service
    answers
    numberOfJokers
    team {
      id
      name
      initials
      searchable
      numberOfInterviews
      session {
        id
        description
        contact
        numberOfParticipants
        startDate
        endDate
        gameOver
        searchable
      }
      quizzes {
        nextToken
      }
    }
  }
}
`;
export const updateQuiz = `mutation UpdateQuiz($input: UpdateQuizInput!) {
  updateQuiz(input: $input) {
    id
    service
    answers
    numberOfJokers
    team {
      id
      name
      initials
      searchable
      numberOfInterviews
      session {
        id
        description
        contact
        numberOfParticipants
        startDate
        endDate
        gameOver
        searchable
      }
      quizzes {
        nextToken
      }
    }
  }
}
`;
export const deleteQuiz = `mutation DeleteQuiz($input: DeleteQuizInput!) {
  deleteQuiz(input: $input) {
    id
    service
    answers
    numberOfJokers
    team {
      id
      name
      initials
      searchable
      numberOfInterviews
      session {
        id
        description
        contact
        numberOfParticipants
        startDate
        endDate
        gameOver
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
