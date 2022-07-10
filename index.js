const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const schema = require('./schema');
const dataSources = require('./data-sources');

async function startApolloServer(schema) {
  const app = express();
  const server = new ApolloServer({
    ...schema,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer(schema);