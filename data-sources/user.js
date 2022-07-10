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
}

module.exports = Users;