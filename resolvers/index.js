const resolvers = {
  Query: {
    async articles(parent, args, context) {
      const { dataSources } = context;
      const { articles } = dataSources;
      return await articles.getArticles();
    },
    async article(parent, { id }, { dataSources }) {
      const { articles } = dataSources;
      return await articles.getArticle(id);
    },
    async user(parent, { id }, { dataSources }) {
      const { users } = dataSources;
      return await users.getUser(id);
    }
  },
};

module.exports = resolvers;