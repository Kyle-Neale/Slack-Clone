export default `

  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type CreateTeamResponse {
    ok: Boolean!
    errors: [Errors!]
  }

  type Mutation {
    createTeam(name: String!): CreateTeamResponse!
  }
`;
