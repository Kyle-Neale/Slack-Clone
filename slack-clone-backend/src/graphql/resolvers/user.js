export default {

  Query: {
    getUserById: async (parent, { id }, { models }, info) => await models.User.findOne({ where: { id } }),
    allUsers: async (parent, args, { models }, info) => await models.User.findAll()
  },
  Mutation: {
    createUser: async (parent, args, { models }, info) => await models.User.create(args)
  }
}
