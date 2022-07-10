const { MongoDataSource }  = require('apollo-datasource-mongodb');

class Users extends MongoDataSource {
  getUsers() {
    return this.model.find(); // 访问数据模型对象
  }
  getUser(id) {
    console.log(id)
    return this.findOneById(id);
  }
}

module.exports = Users;