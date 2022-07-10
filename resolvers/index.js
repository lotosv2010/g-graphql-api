const { UserInputError } = require('apollo-server-express');
const jwt = require('../util/jwt');
const md5 = require('../util/md5');
const { jwtSecret } = require('../config/config.default');

const resolvers = {
  Query: {
    async currentUser(parent, args, { user }) {
      // 返回用户信息
      return {
        user
      };
    }
  },
  Mutation: {
    async login(parent, { user }, { dataSources }) {
      const { users } = dataSources;
      // 用户是否存在
      const userData = await users.findByEmail(user.email);
      if(!userData) {
        throw new UserInputError('邮箱已存在');
      }
      // 密码是否正确
      if(md5(user.password) !== userData.password) {
        throw new UserInputError('密码错误');
      }
      // 生成 token
      const token = await jwt.sign({
        userId: userData._id
      }, jwtSecret, {
        expiresIn: '7d' // 过期时间 7 天
      });
      // 发送
      return {
        user: {
          ...userData.toObject(),
          token
        }
      };
    },
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
    async updateUser(parent, { user: payload }, { dataSources, user }) {
      const { users } = dataSources;
      // 更新用户
      if(payload.password) {
        payload.password = md5(payload.password);
      }
      const userData = await users.updateUser(user._id, payload);
      return {
        user: {
          ...userData.toObject()
        }
      };
    }
  }
};

module.exports = resolvers;