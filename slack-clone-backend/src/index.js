import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import models from '../models';
import { refreshTokens } from './auth';

const SECRET = 'asdnain12o31odsalno2n35'
const SECRET2 = 'asdnain12o3o2n351235123112asda213eqdsyherd5ysv'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors('*'));


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http:localhost:3000/graphql`
  },
  context: ({ req }) => {
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

server.applyMiddleware({ app });

const getUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, secret);
      req.user = user;
    } catch (error) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET);
      if (newTokens.token && newToken.refreshToken) {
      }
    }
  }
  next();
};

app.use(getUser);


const PORT = 4000;

models.sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
})
