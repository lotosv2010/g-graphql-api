const { MongoDataSource }  = require('apollo-datasource-mongodb');

class Articles extends MongoDataSource {
  saveArticle(parmas) {
    const article = new this.model(parmas);
    // TODO： 解决表管理的问题——数据库方式
    // article.populate('author');
    return article.save();
  }
  async getArticles({ offset, limit }) {
    return await this.model.find().skip(offset).limit(limit).sort({
      createAt: -1
    });
  }
  async getArticlesCount() {
    return await this.model.countDocuments();
  }
}

module.exports = Articles;