import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import data from "./data";

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
  Game: {
    reviews(parent) {
      return data.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return data.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return data.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return data.games.find((g) => g.id === parent.game_id);
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
