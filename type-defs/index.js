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
    createAt: Date!,
    updatedAt: Date!
  }

  type Query {
    articles: [Article!],
    article(id: ID!): Article,
    user(id: ID!): User
  }
`;

module.exports = typeDefs;