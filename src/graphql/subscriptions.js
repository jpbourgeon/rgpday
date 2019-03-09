// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateScenario = `subscription OnCreateScenario {
  onCreateScenario {
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
export const onUpdateScenario = `subscription OnUpdateScenario {
  onUpdateScenario {
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
export const onDeleteScenario = `subscription OnDeleteScenario {
  onDeleteScenario {
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
export const onCreateSession = `subscription OnCreateSession {
  onCreateSession {
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
export const onUpdateSession = `subscription OnUpdateSession {
  onUpdateSession {
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
export const onDeleteSession = `subscription OnDeleteSession {
  onDeleteSession {
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
export const onCreateTeam = `subscription OnCreateTeam {
  onCreateTeam {
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
export const onUpdateTeam = `subscription OnUpdateTeam {
  onUpdateTeam {
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
export const onDeleteTeam = `subscription OnDeleteTeam {
  onDeleteTeam {
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
export const onCreateConfig = `subscription OnCreateConfig {
  onCreateConfig {
    id
    value
  }
}
`;
export const onUpdateConfig = `subscription OnUpdateConfig {
  onUpdateConfig {
    id
    value
  }
}
`;
export const onDeleteConfig = `subscription OnDeleteConfig {
  onDeleteConfig {
    id
    value
  }
}
`;
