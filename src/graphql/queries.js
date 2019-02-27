// eslint-disable
// this is an auto generated file. This will be overwritten

export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
    id
    name
    description
    numberOfParticipants
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
      numberOfParticipants
      startDate
      endDate
    }
    nextToken
  }
}
`;
