const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Article {
    id: ID!,
    title: String!,
    description: String!,
    body: String!,
    createAt: Date!,
    updatedAt: Date!
  }

  type User {
    _id: ID!,
    username: String!,
    email: String!,
    bio: String,
    imge: String,
    token: String
  }

  type UserPayload {
    user: User
  }

  input CreateUserInput {
    username: String!,
    email: String!,
    password: String!,
  }

  type Mutation {
    createUser(user: CreateUserInput): UserPayload
  }

  type Query {
    user(id: ID!): User
  }
`;

module.exports = typeDefs;