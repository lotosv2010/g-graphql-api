const articleResolvers = require('./user');
const userResolvers = require('./article');

const resolvers = [
  userResolvers,
  articleResolvers
];

module.exports = resolvers;