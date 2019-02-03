import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { tryLogin } from '../../auth.js'

export const formatErrors = (error, models) => {
  if (error instanceof models.sequelize.ValidationError) {
    return error.errors.map(e => _.pick(e, ['path', 'message']));
  }
  return [
    {
      path: 'name',
      message: 'Something went wrong!'
    }
  ];
};

export default {
  Query: {
    getUserById: async (parent, { id }, { models }, info) => await models.User.findOne({ where: { id } }),
    allUsers: async (parent, args, { models }, info) => await models.User.findAll()
  },
  Mutation: {
    loginUser: (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    registerUser: async (parent, args, { models }, info) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }
  }
}
