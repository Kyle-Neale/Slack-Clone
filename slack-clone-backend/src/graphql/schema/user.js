export default `

  type User {
    id: Int!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    getUserById(id: Int!): User!
    allUsers: [User!]!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Errors!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Errors!]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): RegisterResponse!
    loginUser(email: String!, password: String!): LoginResponse!
  }
`;
