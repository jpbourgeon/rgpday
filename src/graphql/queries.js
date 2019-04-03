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
export const getPresentation = `query GetPresentation($id: ID!) {
  getPresentation(id: $id) {
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
export const listPresentations = `query ListPresentations(
  $filter: ModelPresentationFilterInput
  $limit: Int
  $nextToken: String
) {
  listPresentations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
  }
}
`;
export const getTeam = `query GetTeam($id: ID!) {
  getTeam(id: $id) {
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
    nextToken
  }
}
`;
export const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
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
export const listQuizs = `query ListQuizs(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
