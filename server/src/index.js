import express from "express";
import config from "./config";
import typeDefs from "./graphql/data/typeDefs";
import resolvers from "./graphql/data/resolvers";
import { ApolloServer } from "apollo-server-express";

config();

const expressApp = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

expressApp.get("/home", (request, response) => {
  response.send("Hello from firebase express app!");
});

expressApp.get("/user", (request, response) => {
  response.send("Ha ha, you smart as*.");
});

server.applyMiddleware({ app: expressApp, path: "/graphql" });

expressApp.listen(process.env.PORT || 3000);
