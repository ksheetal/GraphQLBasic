const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const axios = require("axios");
const fetch = require("node-fetch");
const { gql } = require("apollo-server-express");
const { users } = require("./fakeData");

const app = express();

const typeDefs = gql`
  type User {
    name: String!
    age: String!
    married: String!
  }

  type Post {
    userId: Int!
    id: Int!
    title: String!
    body: String!
  }

  type ytd {
    volume: String!
    price_change: String!
    price_change_pct: String!
    volume_change: String!
    volume_change_pct: String!
    market_cap_change: String!
    market_cap_change_pct: String!
  }

  type StockData {
    id: String!
    currency: String!
    symbol: String!
    name: String!
    logo_url: String!
    status: String!
    price: String!
    price_date: String!
    price_timestamp: String!
    circulating_supply: String!
    market_cap: String!
    market_cap_dominance: String!
    num_exchanges: String!
    num_pairs: String!
    num_pairs_unmapped: String!
    first_candle: String!
    first_trade: String!
    first_order_book: String!
    rank: String!
    rank_delta: String!
    high: String!
    high_timestamp: String!
    ytd: ytd!
  }

  # Query
  type Query {
    getAllUsers: [User!]!
    getAllPosts: [Post!]!
    getAllStockData: [StockData!]!
  }
`;

const resolvers = {
  Query: {
    getAllUsers() {
      return users;
    },
    async getAllStockData() {
      //   const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      const res = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=7e69217413100117711004501a2a5e57&currency=BTC,ETH&ids=BTC,ETH,XRP&page=1&per-page=10`
      );
      return res.data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 1234 }, () => {
  console.log("SERVER RUNNING ON PORT :: 1234");
});
