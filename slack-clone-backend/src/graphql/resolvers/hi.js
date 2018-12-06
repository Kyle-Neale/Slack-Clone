export default {
  Query: {
    hi: (parent, args, context, info) => {
      return 'Hello World, from the Hi.js Resolver file!'
    }
  }
}
