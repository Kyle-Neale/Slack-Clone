import { ApolloServer, gql } from 'apollo-server';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from '../models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      models,
      user: {
        id: 1
      }
    }
  }
});


models.sequelize.sync().then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})

// export default mergeTypes(typeDefs, { all: true });
