export default {

  Query: {
    getUserById: (parent, { id }, { models }, info) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }, info) => models.User.findAll()
  },
  Mutation: {
    createUser: (parent, args, { models }, info) => {
      return models.User.create(args)
    }
  }
}
