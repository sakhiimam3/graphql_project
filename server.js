import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { users ,quotes} from './data.js';


const typeDefs = `
  type User {
    id:ID
    name:String
    email:String
    quotes:[quotes]
  }
  
  type quotes{
        description :String
        by:ID
  }

  type Query {
    users: [User]
    quotes:[quotes]
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    quotes :()=>quotes
  },
  User:{
       quotes :(user)=>quotes.filter((quote)=>quote.by === user.id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins:[ApolloServerPluginLandingPageLocalDefault()]
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});


console.log(`🚀  Server ready at: ${url}`);



