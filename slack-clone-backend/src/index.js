import { ApolloServer, gql } from 'apollo-server';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from '../models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const SECRET = 'asdnain12o31odsalno2n35'
const SECRET2 = 'asdnain12o3o2n351235123112asda213eqdsyherd5ysv'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      user: {
        id: 1
      },
      SECRET,
      SECRET2,
      models,
    }
  }
});


models.sequelize.sync({force: true}).then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})

// export default mergeTypes(typeDefs, { all: true });
