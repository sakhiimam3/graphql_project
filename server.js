import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {typeDefs} from "./model/userSchemagql.js"
import {resolvers} from './resolvers/userResolver.js'





const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins:[ApolloServerPluginLandingPageLocalDefault()]
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});


console.log(`🚀  Server ready at: ${url}`);



