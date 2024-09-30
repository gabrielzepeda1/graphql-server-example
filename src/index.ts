import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import data from "./data";

const resolvers = {
  Query: {
    games() {
      return data.games;
    },
    authors() {
      return data.authors;
    },
    reviews() {
      return data.reviews;
    },
  },
};
//server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port", 4000);
