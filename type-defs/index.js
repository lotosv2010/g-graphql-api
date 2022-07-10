const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  # User
  type User {
    _id: ID! @deprecated(reason: "即将被废除"),
    username: String!,
    email: String!,
    bio: String,
    image: String,
    token: String,
    following: Boolean
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

  # Article
  type Article {
    id: ID!,
    title: String!,
    description: String!,
    body: String!,
    tagList: [String!],
    createAt: Date!,
    updatedAt: Date!,
    favorited: Boolean,
    favoritesCount: Int,
    author: User
  }

  type ArticlePayload {
    article: Article
  }

  input CreateArticleInput {
    title: String!,
    description: String!,
    body: String!,
    tagList: [String!],
  }

  # Mutation
  type Mutation {
    # User
    login(user: LoginInput): UserPayload,
    createUser(user: CreateUserInput): UserPayload,
    updateUser(user: UpdateUserInput): UserPayload @auth

    # Article
    createArticle(article: CreateArticleInput): ArticlePayload @auth
  }

  # Query
  type Query {
    # User
    currentUser: UserPayload @auth
  }
`;

module.exports = typeDefs;