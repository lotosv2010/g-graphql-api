const { MongoDataSource }  = require('apollo-datasource-mongodb');

class Articles extends MongoDataSource {
  saveArticle(parmas) {
    const article = new this.model(parmas);
    // TODO： 解决表管理的问题——数据库方式
    // article.populate('author');
    return article.save();
  }
}

module.exports = Articles;