const { MongoDataSource }  = require('apollo-datasource-mongodb');

class Articles extends MongoDataSource {
  getArticles() {
    return this.model.find(); // 访问数据模型对象
  }
  getArticle(id) {
    return this.findOneById(id);
  }
}

module.exports = Articles;