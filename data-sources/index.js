const dbModel = require('../models');
const Users = require('./user');
const Articles = require('./article');

module.exports = () => ({
  users: new Users(dbModel.User),
  articles: new Articles(dbModel.Article),
});