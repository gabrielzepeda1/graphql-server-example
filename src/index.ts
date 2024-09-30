import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import data from "./data";
import { doTypesOverlap } from "graphql";

const resolvers = {
  Query: {
    games() {
      return data.games;
    },
    game(_: any, args: { id: string }) {
      return data.games.find((game) => game.id === args.id);
    },
    authors() {
      return data.authors;
    },
    author(_: any, args: { id: string }) {
      return data.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return data.reviews;
    },
    review(_: any, args: { id: string }) {
      return data.reviews.find((review) => review.id === args.id);
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
