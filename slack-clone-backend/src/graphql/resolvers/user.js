import bcrypt from 'bcrypt';

export default {

  Query: {
    getUserById: async (parent, { id }, { models }, info) => await models.User.findOne({ where: { id } }),
    allUsers: async (parent, args, { models }, info) => await models.User.findAll()
  },
  Mutation: {
    registerUser: async (parent, {password, ...otherArgs}, { models }, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.User.create({ ...otherArgs , password: hashedPassword });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
}
