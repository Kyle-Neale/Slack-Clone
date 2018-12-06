export default {

  Mutation: {
    createTeam: (parent, args, { models, user }, info ) => models.Team.create({ ...args, owner: user.id})
  }
}
