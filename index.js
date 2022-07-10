const { ApolloServer, } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const chalk = require('chalk');
const schema = require('./schema');
const dataSources = require('./data-sources');

async function startApolloServer(schema) {
  const app = express();
  const server = new ApolloServer({
    csrfPrevention: true,
    cache: 'bounded',
    dataSources,
    // TODO：所有的 GraphQL 查询都会经过这里
    context({ req }) {
      // 从请求头获取 token 数据
      let token = req.headers['authorization'];
      token = token ? token.split('Bearer ')[1] : null;
      return {
        token
      }
    },
    schema
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(chalk.green.bold(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}


startApolloServer(schema);