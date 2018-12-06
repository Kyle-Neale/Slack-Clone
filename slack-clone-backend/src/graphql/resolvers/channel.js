export default {
  Mutation: {
    createChannel: async (parent, args, { models }, info) => {
      try {
        let res = await models.Channel.create(args)
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
}
