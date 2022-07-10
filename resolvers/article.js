const articleResolvers = {
  Query: {
    async articles(parent, args, { dataSources }) {
      return {
        ...args
      }
      // const ps = [
      //   dataSources.articles.getArticles({ offset, limit }),
      //   dataSources.articles.getArticlesCount()
      // ];
      // const [articles, articlesCount] = await Promise.all(ps);
      // return {
      //   articles,
      //   articlesCount
      // }
    }
  },
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
  },
  ArticlesPayload: {
    async articles({ offset, limit }, args, { dataSources }) {
      const articles = await dataSources.articles.getArticles({ offset, limit });
      return articles
    },
    async articlesCount(parent, args, { dataSources }) {
      const articlesCount = await dataSources.articles.getArticlesCount();
      return articlesCount
    }
  }
};

module.exports = articleResolvers;