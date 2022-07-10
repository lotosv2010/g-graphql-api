
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const authDirective = require('./directives/auth');

const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth');

let schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    authDirectiveTypeDefs
  ],
  resolvers
});

schema = authDirectiveTransformer(schema);

module.exports = schema;