const articleResolvers = {
  Query: {},
  Mutation: {
    async createArticle(parent, { article }, { dataSources, user }) {
      const { articles } = dataSources;
      const articleData = await articles.saveArticle({ ...article, author: user._id});
      return {
        article: articleData
      };
    }
  },
  // TODO： 解决表管理的问题——解析链
  Article: {
    async author(parent, args, { dataSources }) {
      const userId = parent.author;
      const { users } = dataSources;
      const user = await users.findById(userId);
      return user;
    }
  }
};

module.exports = articleResolvers;