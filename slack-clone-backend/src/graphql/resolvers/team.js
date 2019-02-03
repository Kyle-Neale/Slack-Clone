import formatErrors from './user.js'

export default {
  Mutation: {
    createTeam: async (parent, args, { models, user }, info ) => {
      try {
        await models.Team.create({ ...args, owner: user.id});
        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(errors)
        };
      }
    }
  }
}
