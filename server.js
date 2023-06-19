import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { typeDefs } from "./userSchemagql.js";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

// import modals here

import "./model/quote.js";
import "./model/user.js";

import { resolvers } from "./resolvers/userResolver.js";
import context from "./middleware/context.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req, "req1111");
    const authToken = req.headers.authorization;
    return {
      authToken,
    };
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: context(req.headers.authorization) }),
  listen: { port: 8000 },
});

console.log(`🚀  Server ready at: ${url}`);
