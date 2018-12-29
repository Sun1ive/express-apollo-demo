require('dotenv-safe').config();
const express = require('express');
const {
  ApolloServer,
  gql,
  makeExecutableSchema
} = require('apollo-server-express');
const { mergeTypes } = require('merge-graphql-schemas');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const userResolvers = require('./resolvers/user');

const { PORT } = require('./config');

const types = [require('./schema/user.gql')];

const typeDefs = mergeTypes(types, { all: true });
const resolvers = {
  Query: {
    ...userResolvers.Query
  },

  Mutation: {
    ...userResolvers.Mutation
  }
};

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  })
});

const app = express();
app
  .use(cors())
  .use(helmet())
  .use(logger('dev'))
  .use(express.json());
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
