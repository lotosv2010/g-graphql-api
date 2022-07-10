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
    _id: ID! @deprecated(reason: "即将被废除"),
    username: String!,
    email: String!,
    bio: String,
    image: String,
    token: String
  }

  type UserPayload {
    user: User
  }

  input LoginInput {
    email: String!,
    password: String!,
  }

  input CreateUserInput {
    username: String!,
    email: String!,
    password: String!,
  }

  input UpdateUserInput {
    username: String,
    email: String,
    password: String,
    image: String,
    bio: String
  }

  type Mutation {
    login(user: LoginInput): UserPayload,
    createUser(user: CreateUserInput): UserPayload,
    updateUser(user: UpdateUserInput): UserPayload @auth
  }

  type Query {
    currentUser: UserPayload @auth
  }
`;

module.exports = typeDefs;