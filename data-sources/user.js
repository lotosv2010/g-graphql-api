const { MongoDataSource }  = require('apollo-datasource-mongodb');

class Users extends MongoDataSource {
  findByEmail(email) {
    return this.model.findOne({ email });
  }
  findByUsername(username) {
    return this.model.findOne({ username });
  }
  findById(id) {
    return this.findOneById(id);
  }
  async saveUser(parmas) {
    const user = new this.model(parmas);
    return user.save();
  }
  async updateUser(userId, data) {
    const user = this.model.findByIdAndUpdate(userId, data, 
      { 
        new: true // 默认返回更新之前的数据，new: true返回更新之后的数据
      }
    );
    return user;
  }
}

module.exports = Users;