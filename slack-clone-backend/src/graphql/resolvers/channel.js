export default {
  Mutation: {
    createChannel: async (parent, args, { models }, info) => {
      try {
        let res = await models.Channel.create(args)
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
