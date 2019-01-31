import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatErrors = (error, models) => {
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
    registerUser: async (parent, {password, ...otherArgs}, { models }, info) => {
      try {
        if (password.length < 5 || password.length > 25) {
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'The password needs to be between 5 and 25 characters long.'
              }
            ]
          }
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs, password: hashedPassword });
        return {
          ok: true,
          user,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }
  }
}
