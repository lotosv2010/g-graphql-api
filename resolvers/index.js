const { UserInputError } = require('apollo-server-express');
const jwt = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');

const resolvers = {
  Query: {
    async user(parent, { id }, { dataSources }) {
      const { users } = dataSources;
      return await users.getUser(id);
    }
  },
  Mutation: {
    async createUser(parent, { user }, { dataSources }) {
      const { users } = dataSources;
      // 判断用户是否存在
      const username = await users.findByUsername(user.username);
      if(username) {
        throw new UserInputError('用户已存在');
      }
      // 判断邮箱是否存在
      const email = await users.findByEmail(user.email);
      if(email) {
        throw new UserInputError('邮箱已存在');
      }
      // 保存用户
      const userData = await users.saveUser(user);
      // 生成 token 发送给客户端
      const token = await jwt.sign({
        userId: userData._id
      }, jwtSecret, {
        expiresIn: '7d' // 过期时间 7 天
      });
      return {
        user: {
          ...userData.toObject(),
          token
        }
      };
    },
  }
};

module.exports = resolvers;