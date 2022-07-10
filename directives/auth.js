const { defaultFieldResolver } = require( 'graphql');
const { mapSchema, MapperKind, getDirective } = require('@graphql-tools/utils');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');

function authDirective(directiveName) {
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on OBJECT | FIELD_DEFINITION`,
    authDirectiveTransformer: schema => mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: fieldConfig => {
        const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
        if (authDirective) {
          // 备份字段本身的 resolves 函数
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            // 重写字段的 resolve 函数
            resolve: async function (source, args, context, info) {
              const { token, dataSources } = context;
              if (!token) {
                throw new AuthenticationError('未授权');
              }
              try {
                // 验证 token 是否有效
                const decodeToken = await jwt.verify(token, jwtSecret);
                // 获取当前登录用户的信息
                const { users } = dataSources;
                const userData = await users.findById(decodeToken.userId);
                if(!userData) {
                  throw new AuthenticationError('未授权');
                }
                context.user = userData;
              } catch (error) {
                throw new AuthenticationError('未授权');
              }
              // 调用原本的 resolve
              const result = await resolve(source, args, context, info);
              // 返回信息
              return result;
            }
          }
        }
      }
    })
  }
}

module.exports = authDirective;